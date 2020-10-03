import express from 'express' ;
import { executeQuery } from './elastic';
import { queryGenerator, generateDefaultQueryExample } from './queryGenerator';
import { Dictionary, KeyValuePair, sortKeys } from './utils';
import { programsPromise, RTVEProgram, getTopics, getTopic } from './rtveProgram';

var router = express.Router()

//URI /alacarta?search=<query string> => devuelve los resultados de la búsqueda
router.get('/', function (req, res, next) {
    try {
        var searchText: string, type: string, page: string

        //texto de entrada al servicio, ie, la busqueda que hace el usuario en la caja de texto
        if (req && req.query && req.query.text && req.query.text !== 'undefined') {
            searchText = req.query.text.toString()
        }

        //Type, son las subquerys que se hacen despues de encontrar un programa, los cajones de fragmentos, completos, 
        if (req && req.query && req.query.type && req.query.type !== 'undefined') {
            type = req.query.type.toString()
        }
        if (req && req.query && req.query.page && req.query.page !== 'undefined') {
            page = req.query.page.toString()
        }


        programsPromise.then((programs: RTVEProgram[]) => {
            queryGenerator(searchText, type, page).then((generatedQuery) => {
                executeQuery(generatedQuery.query).then((response: any) => {
                    var response: any
                    try {
                        var results = response.body.hits.hits.map((h: any) => h._source)
                        var contentTypes = (response.body.aggregations && response.body.aggregations.contentType) ? response.body.aggregations.contentType.buckets : undefined
                        var types = (response.body.aggregations && response.body.aggregations.type) ? response.body.aggregations.type.buckets : undefined
                        var relProgramsLinks = (response.body.aggregations && response.body.aggregations.relPrograms) ? response.body.aggregation.relPrograms.buckets : undefined
                        var relPrograms: RTVEProgram[]

                        response = { generatedQuery: generatedQuery.query, detectedEntities: generatedQuery.detectedEntities, results, types, contentTypes }

                        if (relProgramsLinks && relProgramsLinks.length > 0) {
                            relPrograms = []
                            relProgramsLinks.forEach((programLink: any) => {
                                if (programLink) {
                                    var program = programs.filter(p => p.uri == programLink.key)[0]
                                    if (program && relPrograms.indexOf(program) == -1) {
                                        relPrograms.push(program)
                                    }
                                }
                            })
                            response.relPrograms = relPrograms
                        } 
                    } catch (error) {
                        response = { generatedQuery: generatedQuery.query, detectedEntities: generatedQuery.detectedEntities, error }
                    }
                    res.send(sortKeys(response))
                }, (error: any) => {
                    res.send(sortKeys({ search: req.query.search, error }))
                })
            }, (error: any) => {
                res.send(sortKeys({ search: req.query.search, error }))
            })
        }, (error: any) => {
            res.send(sortKeys({ search: req.query.search, error }))
        })
    } catch (error) {
        res.send(sortKeys({ search: req.query.search, error }))
    }
})


//URI /alacarta/programas => devuelve la lista de los programas
router.get('/programas', function (req, res, next) {
    try {
        programsPromise.then((programas: RTVEProgram[]) => {
            var number: number = -1
            try {
                number = parseInt(req.query.number.toString())
            } catch{
                number = -1
            }

            var programsList: string[] = programas.map(p => p.title).filter(p => p != null).sort((a, b) => a.localeCompare(b));

            //var tvPrograms: RTVEProgram[] = programas.filter(p => p.mainTopic.toLowerCase().includes("televisión")).getRandomElements(number)
            var tvPrograms: RTVEProgram[] = programas.filter(p => p.mainTopic.toLowerCase().includes("series")).getRandomElements(number)
            var radioPrograms: RTVEProgram[] = programas.filter(p => p.mainTopic.toLowerCase().includes("radio")).getRandomElements(number)
            var categories: any = programas.map((p: RTVEProgram) => getTopics(p)).selectMany((p: string) => p)

            const top = new Dictionary(undefined);
            categories.forEach((category: string) => {
                top.add(category, programas.filter(p => getTopic(p).toLowerCase() == category.toLowerCase()))
            });
            var topAsKeyValuePair = top.toKeyValuePairList().sort((a: KeyValuePair, b: KeyValuePair) => b.value.length - a.value.length).slice(0, 15).reverse()

            const portada = new Dictionary(undefined);
            //portada.add("Televisión", tvPrograms)
            portada.add("Series", tvPrograms)
            portada.add("Radio", radioPrograms)

            var item: KeyValuePair
            while (topAsKeyValuePair.length > 0) {
                item = topAsKeyValuePair.pop()
                portada.add(item.key, item.value.getRandomElements(number))
            }
            res.send(sortKeys({ programsList, portada: portada.toKeyValuePairList() }))
        })
    } catch (error) {
        res.send(sortKeys({ search: req.query.search, error }))
    }
})




module.exports = router
