const fieldsCLLegacyVDA = [
    {name: "CWA_CGS：CLXMTP", offsetPercent: 0, timeSpent: 6.0},
    {name: "CGS_K-VDA：CLXMTP", offsetPercent: 0, timeSpent: 3.0},
    {name: "K-VDA：Reversed prepare", offsetPercent: 0, timeSpent: 1.0},
    {name: "CWA_CGS：Start ICA", offsetPercent: 0.58, timeSpent: 3.2},
    {name: "CGS_K-VDA：Start ICA", offsetPercent: 0.58, timeSpent: 1.7}
];
const totalForCLLegacyVDA = 9.2;

const dates = [];
let now = new Date();
for (let i = 0; i < 24; ++i) {
    now.setHours(now.getHours() - 1);
    dates.push(now.toISOString());
}

process.stdout.write("_time, TOTAL");
let n = 1;
for (field of fieldsCLLegacyVDA) {
    process.stdout.write(",OFFSET_" + (n++) + ",");
    process.stdout.write('"' + field.name + '"');
}
process.stdout.write("\n");
for (date of dates) {
    process.stdout.write(date);
    process.stdout.write("," + totalForCLLegacyVDA);

    for (field of fieldsCLLegacyVDA) {
        process.stdout.write("," + Math.round(field.offsetPercent * totalForCLLegacyVDA * 100)/100);
        process.stdout.write("," + field.timeSpent);
    }
    process.stdout.write("\n");
}
