import type {IRegionConfig} from '@/abstraction/IRegionConfig';

const silesiaRegions: IRegionConfig[] = [
    {
        key: 'field',
        terrain: 'field',
        name: 'Field',
        coordinates: [
            [7, 0], [7, 1], [7, 5], [7, 6],
            [8, 0], [8, 1], [8, 6], [9, 5],
            [9, 0],
            [10, 0],
            [22, 4],
            [23, 3], [23, 4],
            [24, 3], [24, 4],
        ],
        images: [
            'public/images/maps/lost-forest/couple-taives-img.png',
            'public/images/maps/lost-forest/3-taives-img.png',
            'public/images/maps/lost-forest/taive-img.png'
        ],
    },
    {
        key: 'sea-1',
        terrain: 'sea',
        coordinates: [
            [0, 6], [1, 6], [2, 7], [3, 6], [4, 7],
            [5, 7], [6, 8], [6, 9], [7, 9], [8, 9],
            [9, 8], [10, 8], [10, 7], [11, 6], [12, 6],
            [13, 6], [14, 6], [15, 6], [16, 7], [16, 8],
            [17, 8], [18, 9], [19, 8], [20, 8], [21, 7],
            [22, 7], [23, 7], [24, 7],
        ],
    },
    {
        key: 'deep-sea-1',
        terrain: 'deep-sea',
        name: 'Deep Sea',
        coordinates: [
            [0, 7], [0, 8], [0, 9],
            [1, 7], [1, 8], [1, 9],
            [2, 8], [2, 9],
            [3, 7], [3, 8], [3, 9],
            [4, 8], [4, 9],
            [5, 8], [5, 9],
            [9, 9],
            [10, 9],
            [11, 7], [11, 8], [11, 9],
            [12, 7], [12, 8], [12, 9],
            [13, 7], [13, 8], [13, 9],
            [14, 7], [14, 8], [14, 9],
            [15, 7], [15, 8], [15, 9],
            [16, 9],
            [17, 9],
            [19, 9],
            [20, 9],
            [21, 8], [21, 9],
            [22, 8], [22, 9],
            [23, 8], [23, 9],
            [24, 8], [24, 9],
        ],
    },
    {
        key: 'forest-1',
        terrain: 'forest',
        coordinates: [
            [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5],
            [4, 1], [4, 2], [4, 3],
            [5, 0], [5, 1], [5, 2], [5, 3],
            [6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5],
            [13, 0],
            [14, 0], [14, 3],
            [15, 0], [15, 2], [15, 3], [15, 4], [15, 5],
            [16, 0], [16, 3], [16, 4], [16, 5],
            [17, 0], [17, 3], [17, 4], [17, 5],
            [18, 0], [18, 2], [18, 3],
            [19, 3],
            [20, 4], [20, 5], [20, 6],
            [21, 0], [21, 1], [21, 4], [21, 5],
            [22, 0], [22, 1], [22, 2], [22, 5],
            [23, 0], [23, 1], [23, 5],
            [24, 5],
        ],
        images: ['public/images/maps/lost-forest/single-tree-shadow.png']
    },
    {
        key: 'deep-forest-1',
        terrain: 'deep-forest',
        coordinates: [
            [1, 0], [1, 1],
            [2, 0], [2, 1],
            [3, 0],
            [4, 0],
            [7, 2], [7, 3], [7, 4],
            [8, 2], [8, 3], [8, 5],
            [9, 1], [9, 2], [9, 4],
            [10, 1], [10, 4],
            [11, 0], [11, 3],
            [12, 0], [12, 1], [12, 2], [12, 3],
            [13, 1], [13, 2], [13, 3],
            [14, 1], [14, 2], [14, 4], [14, 5],
            [15, 1],
            [16, 1], [16, 2],
            [17, 1], [17, 2],
            [18, 1],
            [19, 0], [19, 1], [19, 2],
            [20, 0], [20, 1], [20, 3],
        ],
        images: ['public/images/maps/lost-forest/group-tree-shadow.png']
    },
    {
        key: 'desert-1',
        terrain: 'desert',
        name: 'Desert',
        coordinates: [
            [1, 4], [1, 5],
            [2, 4],
            [3, 4],
            [4, 4],
            [5, 4], [5, 5],
            [6, 6], [6, 7],
            [7, 7],
            [8, 7],
            [9, 6],
            [16, 6],
            [17, 6], [17, 7],
            [18, 4], [18, 5], [18, 6], [18, 7], [18, 8],
            [19, 4], [19, 5], [19, 6], [19, 7],
            [20, 7],
            [21, 6],
            [22, 6],
            [23, 6],
            [24, 6],
        ],
        images: [
            'public/images/maps/lost-forest/kuschi-2-shadow.png',
            'public/images/maps/lost-forest/kuschi-shadow.png',
            'public/images/maps/lost-forest/kuschi-3-shadow.png',
            'public/images/maps/lost-forest/kuschi-4-shadow.png'
        ]
    },
    {
        key: 'deep-desert-1',
        terrain: 'deep-desert',
        name: 'Deep Desert',
        coordinates: [
            [1, 5],
            [2, 5], [2, 6],
            [3, 5],
            [4, 5], [4, 6],
            [5, 6],
            [7, 8],
            [8, 8],
            [9, 7],
            [18, 7],
        ],
        images: [
            'public/images/maps/lost-forest/single-palm-shadow.png',
        ]
    },
    {
        key: 'mountain-1',
        terrain: 'mountain',
        coordinates: [
            [8, 4],
            [9, 3],
            [10, 2], [10, 3], [10, 6], [11, 5], [12, 5], [13, 5],
            [11, 1], [11, 2],
            [20, 2],
            [21, 2], [21, 3],
            [22, 3],
            [23, 2],
            [24, 0], [24, 1], [24, 2],
        ],
        images: ['public/images/maps/lost-forest/mountain-3-img.png']
    },
    {
        key: 'swamp-1',
        terrain: 'swamp',
        name: 'Swamp',
        coordinates: [
            [1, 2], [1, 3],
            [2, 2], [2, 3],
            [3, 1], [3, 2], [3, 3],
            [10, 5], [11, 4], [12, 4],
        ],
        images: [
            'public/images/maps/lost-forest/dry-tree-img.png',
        ],
    },
    {
        key: 'camping',
        terrain: 'camp',
        name: 'Camping',
        coordinates: [
            [5, 2]
        ],
        images: [
            'public/images/maps/lost-forest/house-img.png',
        ],
    },
    {
        key: 'evil-portal',
        terrain: 'evil-portal',
        name: 'Evil Portal',
        coordinates: [
            [13, 4],
        ],
        images: [
            'public/images/maps/lost-forest/dragon-eye.gif',
        ]
    },
    {
        key: 'monster-prison',
        terrain: 'monster-prison',
        name: 'Monster Prison',
        coordinates: [
            [22, 1],
        ],
        images: [
            'public/images/maps/lost-forest/monster.gif',
        ]
    }
];

export default silesiaRegions;