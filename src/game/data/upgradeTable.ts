import type { SpecialUpgrade } from '../../types/game'
interface SpecialUpgradesState {
    items: SpecialUpgrade[]
}

/*
** Type = clickpower = poder do clique / pps = pontos por segundo / xpgain = quantidade de xp fixo / xp = quantidade de xp ganho 
** typeGain = B = ganho bruto extra / P = percentagem a mais
*/

export const SpecialUpgradesState = {
    items: [
        {
            id: 1,
            name: 'Magia do clique',
            type: 'clickpower',
            typeGain: 'P',
            value: 0.1,
            cost: 100,
            qtdmax: 9999,
            assetsCategory: [],
            assetsId: [],
            image: 'https://placehold.co/40x40/020617/6ee7b7?text=MC',
        },
        {
            id: 2,
            name: 'Magia de automação',
            type: 'pps',
            value: 0.25,
            cost: 200,
            qtdmax: 9999,
            assetsCategory: [],
            assetsId: [],
            image: 'https://placehold.co/40x40/020617/6ee7b7?text=MA',
        },
        {
            id: 3,
            name: 'Melhora da qualidade do café',
            type: 'pps',
            value: 0.25,
            cost: 200,
            qtdmax: 3,
            assetsCategory: [],
            assetsId: [],
            image: 'https://placehold.co/40x40/020617/6ee7b7?text=MA',
        },
        {
            id: 4,
            name: 'Melhora da qualidade do café',
            type: 'pps',
            value: 0.25,
            cost: 200,
            qtdmax: 3,
            assetsCategory: [],
            assetsId: [],
            image: 'https://placehold.co/40x40/020617/6ee7b7?text=MA',
        },
        {
            id: 5,
            name: 'Melhora na qualidade do prédio',
            type: 'pps',
            value: 0.25,
            cost: 200,
            qtdmax: 3,
            assetsCategory: [],
            assetsId: [],
            image: 'https://placehold.co/40x40/020617/6ee7b7?text=MA',
        },
    ],
}
