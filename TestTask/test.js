const arrayRequest = [
    {
        available: [240, 360, 720],
        allowed: [360, 720],
        preferred: [1080],
        mustBe: [360]
    },
    {
        available: [240, 720],
        allowed: [360, 720],
        preferred: [1080],
        mustBe: [720]

    },
    {
        available: [240],
        allowed: [360, 720],
        preferred: [1080],
        mustBe: []

    },
    {
        available: [240, 360, 720],
        allowed: [240, 360, 720, 1080],
        preferred: [240, 360],
        mustBe: [240, 360]

    },
    {
        available: [240, 720],
        allowed: [240, 360, 720, 1080],
        preferred: [240, 360],
        mustBe: [240, 720]

    },
    {
        available: [240, 720],
        allowed: [240, 360, 1080],
        preferred: [240, 360],
        mustBe: [240]
    },
    {
        available: [720],
        allowed: [240, 360, 1080],
        preferred: [240, 360],
        mustBe: []

    },
    {
        available: [240, 360],
        allowed: [240, 360],
        preferred: [720, 1080],
        mustBe: [360]

    },
    {
        available: [240, 360, 720],
        allowed: [360, 'any'],
        preferred: [360, 720],
        mustBe: [360, 720]
    },
    {
        available: [240, 360, 720],
        allowed: [240, 360, 720],
        preferred: ['any', 720],
        mustBe: [240, 360, 720]
    },
    {
        available: [240, 360, 720],
        allowed: [360, 1080],
        preferred: ['any', 720],
        mustBe: [360]
    },
    {
        available: [240, 360, 720],
        allowed: [1080],
        preferred: ['any', 720],
        mustBe: []
    },

]

const attempt = ({ available, allowed, preferred }) => {
    const set = new Set();

    let i = available.length - 1;
    let j = allowed.length - 1;
    let k = preferred.length - 1;

    while (j >= 0) {
        let shouldUpdate = false;

        let lastAvailable = available[i];
        let lastAllowed = allowed[j];
        let lastPref = preferred[k];

        if (!lastAvailable) break;

        if (lastAvailable < lastAllowed) {
            j--;
        } else if (lastAvailable >= lastAllowed || lastAllowed === 'any') {

            if (lastAvailable > lastPref && lastAllowed !== 'any') {
                shouldUpdate = true;
            } else if (preferred.includes('any')) {
                set.add(allowed.includes(lastAvailable) ? lastAvailable : null)
                i--
                continue
            } else {
                set.add(lastAvailable);
                k--;
                j--;
            }
        }
        if (shouldUpdate) {
            i--;
        }
    }
    return Array.from(set).reverse()
}

for (let i = 0, j = 0; i < arrayRequest.length; i++) {
    arrayRequest[i]['returns'] = attempt(arrayRequest[i]);
    console.log(`${arrayRequest[i].mustBe} === ${arrayRequest[i].returns}`);
}








