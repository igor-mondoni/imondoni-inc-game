import { xpTable } from './data/xpTable'

export const levelTableMultiplier = (currentLevel: number): number | null => {
    const range = xpTable.find(r => currentLevel >= r.min && currentLevel <= r.max);
    return range ? range.value : null;
};

export const levelGetCurrent = (currentXpPoints: number): number => {
    let accumulatedXp = 0;

    for (const range of xpTable) {
        for (let level = range.min; level <= range.max; level++) {
            const xpNeeded = range.value;

            if (currentXpPoints < accumulatedXp + xpNeeded) {
                return level;
            }

            accumulatedXp += xpNeeded;
        }
    }

    return xpTable[xpTable.length - 1].max;
};


export const getLevelDataFromXp = (currentXp: number) => {
    let accumulatedXp = 0;

    for (const range of xpTable) {
        for (let level = range.min; level <= range.max; level++) {
            const xpNeeded = range.value;
            const bonus = range.bonusPoints;
            const bonusPps = range.bonusPps;
            const bonusPower = range.bonusClickPower;
            if (currentXp < accumulatedXp + xpNeeded) {
                return {
                    level,
                    currentXp,
                    xpIntoLevel: currentXp - accumulatedXp,
                    xpNeededForNextLevel: xpNeeded,
                    xpRemaining: accumulatedXp + xpNeeded - currentXp,
                    dpBonus: bonus,
                    bonusPps: bonusPps,
                    bonusPower: bonusPower
                };
            }

            accumulatedXp += xpNeeded;
        }
    }

    const maxLevel = xpTable[xpTable.length - 1].max;

    return {
        level: maxLevel,
        currentXp,
        xpIntoLevel: 0,
        xpNeededForNextLevel: 0,
        xpRemaining: 0
    };
};