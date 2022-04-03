export function scoreFormat (score: number) : string {
    let scrstringlength = score.toString().length;
    let txt = "";

    for (let i = 0; i < 9 - scrstringlength; i++) {
        txt += "0";
    }

    txt += score.toString();

    return txt;
}