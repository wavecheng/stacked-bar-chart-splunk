const fieldsCLLegacyVDA = [
    {name: "CWA_CGS：CLXMTP", offsetPercent: 0, timeSpent: 5.8},
    {name: "CGS_Connector：CLXMTP", offsetPercent: 0, timeSpent:3.0},
    {name: "Connector：Resolve CL", offsetPercent: 0, timeSpent:1.1},
    {name: "Connector_Broker：Request address", offsetPercent: 0.2, timeSpent:1.0},
    {name: "Broker_Legacy VDA：Prepare", offsetPercent: 0.2, timeSpent:0.7},

    {name: "CWA_CGS：Start ICA", offsetPercent: 0.58, timeSpent:3.0},
    {name: "CGS_Legacy VDA：Start ICA", offsetPercent: 0.58, timeSpent:1.7},
    {name: "Legacy VDA：Start ICA", offsetPercent: 0.58, timeSpent:1.5}
];
const totalForCLLegacyVDA = 8.8;

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
