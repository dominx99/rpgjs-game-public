import { Magnificence } from "../enum/ItemMagnificience";

export class MagnificenceRandomizer {
    get(): Magnificence {
        const random = (Math.random() * 100) + 1;

        const probabilities = [
            {
                magnificence: Magnificence.LOWEST,
                probability: {
                    start: 0,
                    end: 70
                }
            },
            {
                magnificence: Magnificence.LOW,
                probability: {
                    start: 70,
                    end: 90
                }
            },
            {
                magnificence: Magnificence.MEDIUM,
                probability: {
                    start: 90,
                    end: 97
                }
            },
            {
                magnificence: Magnificence.HIGH,
                probability: {
                    start: 97,
                    end: 99.5
                }
            },
            {
                magnificence: Magnificence.HIGHEST,
                probability: {
                    start: 99.5,
                    end: 100
                }
            }
        ];

        for (const probability of probabilities) {
            if (random >= probability.probability.start && random <= probability.probability.end) {
                return probability.magnificence;
            }
        }

        return Magnificence.LOWEST;
    }
}
