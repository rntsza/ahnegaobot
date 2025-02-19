const axios = require("axios");
const zlib = require("zlib");
const xml2js = require("xml2js");
const { JSDOM } = require("jsdom");
const itemCache = new Map();

const parsePoB = async (message, pobbKey) => {
    try {
        console.log(`🔍 Extraindo informações do PoB: ${pobbKey}`);
        const url = `https://pobb.in/${pobbKey}`;
        const response = await axios.get(url, {
            headers: { "User-Agent": "Mozilla/5.0" }
        });

        const dom = new JSDOM(response.data, {
            resources: "usable",
            runScripts: "outside-only",
            pretendToBeVisual: true
        });

        const textarea = dom.window.document.querySelector('textarea[aria-label="Path of Building buildcode"]');

        if (!textarea) {
            await message.reply("⚠️ Não foi possível extrair informações desse PoB.");
            return;
        }

        const base64Encoded = textarea.textContent.trim();
        const decoded = Buffer.from(base64Encoded.replace(/-/g, "+").replace(/_/g, "/"), "base64");
        const inflated = zlib.inflateSync(decoded).toString();

        const parser = new xml2js.Parser();
        const pobData = await parser.parseStringPromise(inflated);

        const buildInfo = pobData.PathOfBuilding.Build[0];
        const stats = buildInfo.PlayerStat.map(stat => ({
            name: stat.$.stat,
            value: parseFloat(stat.$.value) || stat.$.value
        }));

        const fullDPSSkill = stats.find(stat => stat.name === "FullDPS")?.value || "N/A";

        const selectedStats = [
            "AverageDamage",  "Speed", "CritChance", "CritMultiplier", "HitChance",
            "Str", "Dex", "Int", "TotalEHP", "MainHandAccuracy", "Life",
            "LifeRegenRecovery", "Mana", "EnergyShield", "Ward", "Rage",
            "NetLifeRegen", "NetManaRegen", "Evasion", "Armour", "PhysicalDamageReduction", "EffectiveBlockChance",
            "EffectiveSpellBlockChance", "AttackDodgeChance", "SpellDodgeChance", "EffectiveSpellSuppressionChance",
            "FireResist", "ColdResist", "LightningResist", "ChaosResist", "EffectiveMovementSpeedMod",
            "FullDPS", "FullDotDPS", "PowerChargesMax", "FrenzyChargesMax", "EnduranceChargesMax"
        ];

        const formatNumber = (num) => {
            if (typeof num === "number") {
                return num >= 1000 ? num.toLocaleString("en-US", { maximumFractionDigits: 0 }) : num.toFixed(2);
            }
            return num;
        };

        const statNamesMap = {
            "AverageDamage": "Average Damage",
            "Speed": "Attack Speed",
            "CritChance": "Crit Chance",
            "CritMultiplier": "Crit Multi",
            "HitChance": "Hit Chance",
            "Str": "STR",
            "Dex": "DEX",
            "Int": "INT",
            "TotalEHP": "EHP",
            "MainHandAccuracy": "Accuracy",
            "Life": "Life",
            "LifeRegenRecovery": "Life Regen",
            "Mana": "Mana",
            "EnergyShield": "ES - Energy Shield",
            "Ward": "Ward",
            "Rage": "Rage",
            "NetLifeRegen": "Net LifeRegen",
            "NetManaRegen": "Net ManaRegen",
            "Evasion": "Evasion",
            "Armour": "Armour",
            "PhysicalDamageReduction": "PDR - Physical Damage Reduction",
            "EffectiveBlockChance": "Block Chance",
            "EffectiveSpellBlockChance": "Spell Block Chance",
            "AttackDodgeChance": "Attack Dodge Chance",
            "SpellDodgeChance": "Spell Dodge Chance",
            "EffectiveSpellSuppressionChance": "Spell Suppression Chance",
            "FireResist": "Fire Resist",
            "ColdResist": "Cold Resist",
            "LightningResist": "Lightning Resist",
            "ChaosResist": "Chaos Resist",
            "EffectiveMovementSpeedMod": "Movement Speed",
            "FullDPS": "Full DPS",
            "FullDotDPS": "Full Dot DPS(Cap 35.8m)",
            "PowerChargesMax": "Power Charges",
            "FrenzyChargesMax": "Frenzy Charges",
            "EnduranceChargesMax": "Endurance Charges"
        };
        
        let responseText = `<:PepoG:827329526215606272> **PoB Stats** <:PepoG:827329526215606272>\n\n`;

        // selectedStats.forEach(stat => {
        //     const statValue = stats.find(s => s.name === stat)?.value || "N/A";
        //     responseText += `😎 **${stat}**: ${formatNumber(statValue)}\n`;
        // });

        selectedStats.forEach(stat => {
            const statValue = stats.find(s => s.name === stat)?.value || "N/A";
            const displayName = statNamesMap[stat] || stat; 
            responseText += `😎 **${displayName}**: ${formatNumber(statValue)}\n`;
        });

        let dpsMessage = "";
        if (fullDPSSkill > 10000000) {
            dpsMessage = "<:baserg:1164302986059722913> **Dá pra dale!** <a:DinkDonk:1313455701187891261>";
        } else if (fullDPSSkill < 4000000) {
            dpsMessage = "<a:ohmySaddies:1312871409126740031> **Pra ser ruim, tem que melhorar!**";
        } else {
            dpsMessage = "<a:pepoG:827329526215606272> **Vision!** <:chris_wilson:819667457903689728>";
        }

        responseText += `\n<a:ASA:1341079821408538756> **Full DPS:** ${formatNumber(fullDPSSkill)}\n\n🛠️ Para ver os itens, digite **!itens** (Soon)`;
        if (dpsMessage) {
            responseText += `\n${dpsMessage}\n`;
        }
        
        await message.reply(responseText);

        const items = pobData.PathOfBuilding.Items?.[0]?.Item || [];
        itemCache[message.author.id] = items;
    } catch (error) {
        console.error("Erro ao processar PoB:", error);
        await message.reply("⚠️ Ocorreu um erro ao processar esse PoB.");
    }
};

const sendItems = async (message) => {
    const items = itemCache[message.author.id];
    if (!items || items.length === 0) {
        await message.reply("⚠️ Nenhum item encontrado. Gere um PoB primeiro.");
        return;
    }

    let responseText = `🎒 **Itens Equipados:**\n`;

    items.forEach((item, index) => {
        const itemData = item._.split("\n").map(line => line.trim()).filter(line => line);
        responseText += `**${index + 1}.** ${itemData.join("\n  - ")}\n\n`;
    });

    if (responseText.length > 2000) {
        const parts = responseText.match(/[\s\S]{1,1900}/g);
        for (const part of parts) {
            await message.reply(part);
        }
    } else {
        await message.reply(responseText);
    }
};

const processPoBLink = async (message) => {
    const pobbMatch = message.content.match(/pobb.in\/([\w\d-]+)/);
    if (pobbMatch) {
        const pobbKey = pobbMatch[1];
        await parsePoB(message, pobbKey);
    }
};

const processItemRequest = async (message) => {
    if (message.content.toLowerCase() === "!itens") {
        await sendItems(message);
    }
};

module.exports = { processPoBLink, processItemRequest };
