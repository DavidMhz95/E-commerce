import { RTVEProgram, getTopics, programsPromise, extractPossiblePrograms, extractExactProgram, extractCategories } from "./rtveProgram"
import { Dictionary, KeyValuePair } from "./utils";

const esb = require('elastic-builder'); // the builder

const size = 12

export function queryGenerator(text: string, type: string, page: string): Promise<any> {
    return new Promise((resolve, reject) => {
        try {
            var p: number = parseInt(page)
            p = isNaN(p) ? 0 : p

            var possiblePrograms: RTVEProgram[], detectedProgram: RTVEProgram, detectedCategories: KeyValuePair[]
            var description: string

            //Primer paso - Recoger la lista de programas desde RTVE
            programsPromise.then((programas: RTVEProgram[]) => {

                //Segundo paso - Desde el texto introducido intentar recoger los programas coincidentes y los exactos
                var results: any = extractExactProgram(text, programas)
                var possibleName: string;
                if (results) {
                    possibleName = results.possibleName
                    detectedProgram = results.programDetected
                    description = text.replace(possibleName, "").trim();
                }

                if (!detectedProgram) {
                    results = extractPossiblePrograms(text, programas)
                    if (results && results.possibleName && results.possiblePrograms && results.possiblePrograms.length > 0) {
                        possibleName = results.possibleName
                        possiblePrograms = results.possiblePrograms
                        description = text.replace(possibleName, "").trim()
                    } else if (!description) {
                        //Tercer paso - Partir la búsqueda en programa y descripcion
                        //Descripcion: El texto sin el título
                        description = text;
                    }
                }

                //Cuarto paso - Deteccion de categorías
                var categories: string[] = programas.map((p: RTVEProgram) => getTopics(p)).selectMany((p: string) => p).filter((value, index, self) => self.indexOf(value) === index);

                if (description) {
                    results = extractCategories(description, categories)
                    if (results && results.possibleName && results.possiblePrograms && results.possibleCategories.length > 0) {
                        possibleName = results.possibleName
                        detectedCategories = []
                        results.possibleCategories.forEach((category: string) => {
                            if (!detectedCategories.map(d => d.key.toLowerCase()).includes(category.toLowerCase())) {
                                detectedCategories.push({ key: category, value: programas.filter(p => p.mainTopic.includes(category)) })
                            }
                        });
                        description = description.replace(possibleName, "").trim()
                    }
                } else {
                    results = extractCategories(text, categories)
                    if (results && results.possibleName && results.possibleCategories && results.possibleCategories.length > 0) {
                        detectedCategories = []
                        results.possibleCategories.forEach((category: string) => {
                            if (!detectedCategories.map(d => d.key.toLowerCase()).includes(category.toLowerCase())) {
                                detectedCategories.push({ key: category, value: programas.filter(p => p.mainTopic.includes(category)) })
                            }
                        });
                    }
                }

                //Quinto paso generar la query
                var query = esb.boolQuery();
                //Comprobar si se ha detectado un programa
                //En caso de detectarse, se buscan contenidos relacionados con el programa
                if (detectedProgram || (possiblePrograms && possiblePrograms.length > 0)) {
                    var subQueryProgram: any
                    if (detectedProgram) {
                        subQueryProgram = esb.matchPhraseQuery('programRef', detectedProgram.uri)
                    } else {
                        //En caso de NO detectarse se buscan contenidos de los programas sugeridos
                        var subQueryProgram = esb.boolQuery()
                        possiblePrograms.forEach((possibleProgram: RTVEProgram) => {
                            subQueryProgram.should(esb.matchPhraseQuery('programRef', possibleProgram.uri))
                        })
                    }
                    query = query.must(subQueryProgram)
                }

                //En caso de que haya una descripción
                if (description) {
                    var subQueryDescription: any = esb.boolQuery()
                    subQueryDescription.should(esb.matchPhraseQuery('description', description).boost(10))
                    subQueryDescription.should(esb.matchQuery('description', description).boost(5))
                    subQueryDescription.should(esb.matchPhraseQuery('longTitle', description).boost(10))
                    subQueryDescription.should(esb.matchQuery('longTitle', description).boost(5))
                    query = query.must(subQueryDescription)
                }

                //En caso de que haya detectado categorías
                if (detectedCategories && detectedCategories.length > 0) {
                    var subQueryCategories: any = esb.boolQuery()
                    for (var detectedCategory of detectedCategories) {
                        subQueryCategories.must(esb.matchPhraseQuery('mainTopic', detectedCategory.key))
                    }
                    query = query.must(subQueryCategories)
                }

                //Si hay algun content type específico
                if (type) {
                    query.must(esb.matchPhraseQuery('type.name', type))
                }


                const requestBody = esb.requestBodySearch()
                    .query(query)
                    .agg(esb.termsAggregation('contentType', 'contentType.keyword'))
                    .agg(esb.termsAggregation('type', 'type.name.keyword'))
                    //.agg(esb.termsAggregation('relPrograms', 'programRef.keyword'))
                    .from(p * size)
                    .size(size)

                //Solo ordenamos por fecha si se hace una busqueda por descripción
                if (!description) {
                    requestBody.sort(esb.sort('publicationDateTimestamp', 'desc'))
                }

                resolve({
                    query: requestBody.toJSON(),
                    detectedEntities: {
                        detectedProgram,
                        detectedCategories,
                        possiblePrograms,
                        originalText: text,
                        textAfterRecognition: description
                    }
                })
            })
        } catch (error) {
            reject(error)
        }
    })
}

export function generateDefaultQueryExample(): any {
    return { query: { match_phrase: { programRef: { query: "http://www.rtve.es/api/programas/125050" } } } }
}



