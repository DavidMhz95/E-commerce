import { executeQuery } from "./elastic";
import damlev, { parts, containsIgnoreAccent, levenshtein } from "./utils";

export class RTVEProgram {
    uri: string;
    htmlUrl: string;
    htmlShortUrl: string;
    id: string;
    ctvId: number;
    uid: string;
    name: string;
    permalink: string;
    language: string;
    longTitle: string;
    shortTitle: string;
    description: string;
    longDescription: any;
    showMan: any;
    director: any;
    contact: any;
    emission: string;
    publicationDate: string;
    expirationDate: any;
    orden: number;
    logo: string;
    logo2: string;
    thumbnail: string;
    imgBackground: string;
    imgBackground2: string;
    imgPoster: string;
    imgPoster2: string;
    imgPortada: string;
    imgPortada2: string;
    imgCol: string;
    imgCol2: string;
    imgBanner: string;
    imgBanner2: string;
    outOfEmission: boolean;
    channel: Channel;
    fanBoxID: any;
    ageRangeUid: any;
    ageRange: any;
    recommendAgesForChilds: any[];
    seccionesRef: string;
    temporadasRef: string;
    agrupadoresRef: string;
    videosRef: string;
    audiosRef: string;
    multimediasRef: string;
    relacionadosRef: string;
    otherChannelsRef: string;
    childrenInfoRef: string;
    filtro: any;
    webRtve: any;
    webOficial: any;
    promoText: any;
    relatedByLangRef: string;
    publicationDateTimestamp: number;
    contentType: string;
    imageSEO: string;
    imgPinta: string;
    sgce: any;
    kantar: any;
    generos: any[];
    mainTopic: string;
    mainTopicUid: string;
    title: string;
}

export function getTopic(program: RTVEProgram): string {
    var topics: string[] = program.mainTopic.split("/").filter(t => t)
    return topics.length > 2 ? topics[2] : ""
}

export function getTopics(program: RTVEProgram): string[] {
    var topics: string[] = program.mainTopic.split("/").filter(t => t)
    return topics.slice(0, topics.length - 1)
}

export class Channel {
    uri: string;
    htmlUrl: string;
    htmlShortUrl: string;
    id: string;
    medioRef: string;
    uid: string;
    title: string;
    permalink: string;
    programsRef: string;
    videosRef: string;
    audiosRef: string;
    multimediasRef: string;
    directosAhoraRef: string;
    directosEnvivoAhoraRef: string;
    directosTodosAhoraRef: string;
    directosProximosRef: string;
    directosEnvivoProximosRef: string;
    directosTodosProximosRef: string;
    agrupadoresRef: string;
    videosVistosRef: string;
    audiosVistosRef: string;
    multimediasVistosRef: string;
    videosPopularesRef: string;
    audiosPopularesRef: string;
    multimediasPopularesRef: string;
}

var programs: RTVEProgram[]
var programsPromise = new Promise((resolve, reject) => {
    if (programs) {
        resolve(programs)
    } else {
        const query = { query: { match_phrase: { contentType: { query: "programa" } } }, from: 0, size: 5000 }
        executeQuery(query).then((response: any) => {
            programs = response.body.hits.hits.map((r: any) => r._source)
            resolve(programs)
        }, (error: any) => {
            resolve([])
        })
    }
})

export { programsPromise }


export function extractPossiblePrograms(text: string, programs: RTVEProgram[]): any {
    var possiblePrograms: RTVEProgram[] = []
    if (text) {
        var possibleProgramsNames: string[] = parts(text, true)
        var index: number = 0
        var possibleName: string
        while (index < possibleProgramsNames.length && !possibleName) {
            var containedPrograms: RTVEProgram[] = programs.filter(pg => containsIgnoreAccent(pg.title, possibleProgramsNames[index], true));
            if (containedPrograms != null && containedPrograms.length > 0) {
                possibleName = possibleProgramsNames[index]
                //el posible program name es un program name
                containedPrograms.forEach((pro: RTVEProgram) => {
                    possiblePrograms.push(pro);
                })
            }
            index++;
        }
    }
    possiblePrograms = possiblePrograms.sort((a, b) => damlev(a.name.toLowerCase(), text.toLowerCase()) - damlev(b.name.toLowerCase(), text.toLowerCase())).selectMany((p: string) => p).slice(0, 10)
    return { possibleName, possiblePrograms }
}

export function extractExactProgram(text: string, programs: RTVEProgram[]): any {
    if (text) {
        var possibleProgramsNames: string[] = parts(text, true)
        for (var possibleName of possibleProgramsNames) {
            var localPrograms = programs.filter(pg => containsIgnoreAccent(pg.title, possibleName, false));
            if (localPrograms.length > 0 && localPrograms[0]) {
                return { possibleName, programDetected: localPrograms[0] }
            }
        }
    }
    return undefined
}


export function extractCategories(text: string, categories: string[]): any {
    var possibleCategories: string[] = []
    if (text) {
        var possibleCategoriesNames: string[] = parts(text, true)
        var index: number = 0
        var possibleName: string
        while (index < possibleCategoriesNames.length && !possibleName) {
            var containedCategories: string[] = categories.filter(cat => containsIgnoreAccent(cat, possibleCategoriesNames[index], false));
            if (containedCategories != null && containedCategories.length > 0) {
                possibleName = possibleCategoriesNames[index]
                //el posible program name es un program name
                containedCategories.forEach((category: string) => {
                    possibleCategories.push(category);
                })
            }
            index++;
        }
    }
    possibleCategories = possibleCategories.sort((a, b) => damlev(a.toLowerCase(), text.toLowerCase()) - damlev(b.toLowerCase(), text.toLowerCase())).selectMany((p: string) => p).slice(0, 10)
    return { possibleName, possibleCategories }
}

