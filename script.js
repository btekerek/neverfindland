const elements = [
    {
        time: 2,
        type: 'water',
        shape: [[1, 1, 1],
        [0, 0, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'town',
        shape: [[1, 1, 1],
        [0, 0, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'forest',
        shape: [[1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'farm',
        shape: [[1, 1, 1],
        [0, 0, 1],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1, 1, 1],
        [0, 0, 1],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'town',
        shape: [[1, 1, 1],
        [0, 1, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'farm',
        shape: [[1, 1, 1],
        [0, 1, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'town',
        shape: [[1, 1, 0],
        [1, 0, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'town',
        shape: [[1, 1, 1],
        [1, 1, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'farm',
        shape: [[1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'farm',
        shape: [[0, 1, 0],
        [1, 1, 1],
        [0, 1, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'water',
        shape: [[1, 1, 1],
        [1, 0, 0],
        [1, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'water',
        shape: [[1, 0, 0],
        [1, 1, 1],
        [1, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1, 1, 0],
        [0, 1, 1],
        [0, 0, 1]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'water',
        shape: [[1, 1, 0],
        [1, 1, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
]
const missions =
{
    "basic": [
        {
            "title": "Edge of the forest",
            "description": "You get one point for each forest field adjacent to the edge of your map."
        },
        {
            "title": "Sleepy valley",
            "description": "For every row with three forest fields, you get four points."
        },
        {
            "title": "Watering potatoes",
            "description": "You get two points for each water field adjacent to your farm fields."
        },
        {
            "title": "Borderlands",
            "description": "For each full row or column, you get six points."
        }
    ],
    "extra": [
        {
            "title": "Tree line",
            "description": "You get two points for each of the fields in the longest vertically uninterrupted continuous forest. If there are two or more tree lines with the same longest length, only one counts."
        },
        {
            "title": "Watering canal",
            "description": "For each column of your map that has the same number of farm and water fields, you will receive four points. You must have at least one field of both terrain types in your column to score points."
        },
        {
            "title": "Wealthy town",
            "description": "You get three points for each of your village fields adjacent to at least three different terrain types."
        },
        {
            "title": "Magicians' valley",
            "description": "You get three points for your water fields adjacent to your mountain fields."
        },
        {
            "title": "Empty site",
            "description": "You get two points for empty fields adjacent to your village fields."
        },
        {
            "title": "Terraced house",
            "description": "For each field in the longest village fields that are horizontally uninterrupted and contiguous you will get two points."
        },
        {
            "title": "Odd numbered silos",
            "description": "For each of your odd numbered full columns you get 10 points."
        },
        {
            "title": "Rich countryside",
            "description": "For each row with at least five different terrain types, you will receive four points."
        }
    ],
}


const mapContainer = document.getElementById('map');
const nextElementContainer = document.getElementById('next-element');
const timeUnit = document.getElementById('time-unit');
const totalPoints = document.getElementById('total-points');
const remainingUnitsTotal = document.getElementById('remaining-units-total');
const remainingUnitsPerSeason = document.getElementById('remaining-units-per-season');
const mainHeader = document.getElementById('main-header');
const missionInfoContainer = document.getElementById('mission-info');
const currentSeason = document.getElementById('current-season');
const rotateButton = document.getElementById('rotate-btn');
const flipButton = document.getElementById('flip-btn');


const gridSize = 11;
const map = Array.from({ length: gridSize }, () => Array(gridSize).fill(''));
let selectedElement = elements[Math.floor(Math.random() * elements.length)];
let seasons = [
    {
        name: 'Spring',
        points: 0,
    },
    {
        name: 'Summer',
        points: 0
    },
    {
        name: 'Autumn',
        points: 0
    },
    {
        name: 'Fall',
        points: 0
    },
];
currentSeason.innerHTML += seasons[0].name;

let totalUnits = 15;
let unitsPerSeason = 7;
let missionsA = [];
let missionsB = [];
let missionsC = [];
let missionsD = [];
let canPlace = true;

let borderlandsScore = 0;

function renderMap() {
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const cell = createCellElement(row, col);
            mapContainer.appendChild(cell);
        }
    }

    const mountainCells = [
        [2, 2],
        [4, 9],
        [6, 4],
        [9, 10],
        [10, 6]
    ];
    initializeMissions();
    mountainCells.forEach(([row, col]) => {
        const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
        cell.classList.remove('base');
        cell.classList.add('cell');
        cell.classList.add('mountain');
        map[row][col] = 'mountain';
    });
}

function displayMissionInfo(missions, missionType, points) {
    missions.forEach((mission, index) => {
        const missionCard = document.createElement('div');
        missionCard.classList.add('mission-card');
        missionCard.innerHTML = `<strong>${missionType}: ${mission.title} || Points: ${points}</strong><br>${mission.description}`;
        missionInfoContainer.appendChild(missionCard);
    });
}

function initializeMissions() {
    const allMissions = shuffle([...missions.basic, ...missions.extra]);

    missionsA = [allMissions.pop()];
    missionsB = [allMissions.pop()];
    missionsC = [allMissions.pop()];
    missionsD = [allMissions.pop()];

    displayMissionInfo(missionsA, 'A', 0);
    displayMissionInfo(missionsB, 'B', 0);
    displayMissionInfo(missionsC, 'C', 0);
    displayMissionInfo(missionsD, 'D', 0);
}

function placeElementOnMap(event) {
    const cell = event.target;
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    const elementShape = selectedElement.shape;

    if (!canPlace || totalUnits <= 0) return;

    for (let i = 0; i < elementShape.length; i++) {
        for (let j = 0; j < elementShape[i].length; j++) {
            const currentRow = row + i;
            const currentCol = col + j;
            console.log(currentRow,currentCol);
            if (
                currentRow < 0 || currentRow > gridSize ||
                currentCol < 0 || currentCol > gridSize &&
                elementShape[i][j] === 1 &&
                map[currentRow][currentCol] !== ''
            ) {
                canPlace = false;
                break;
            }
        }
        if (!canPlace) break;
    }


    if (canPlace) {

        for (let i = 0; i < elementShape.length; i++) {
            for (let j = 0; j < elementShape[i].length; j++) {
                const currentRow = row + i;
                const currentCol = col + j;
                if (
                    currentRow >= 0 && currentRow < gridSize &&
                    currentCol >= 0 && currentCol < gridSize &&
                    elementShape[i][j] === 1
                ) {
                    const mapCell = document.querySelector(
                        `.cell[data-row="${currentRow}"][data-col="${currentCol}"]`
                    );

                    mapCell.classList.remove('base');
                    mapCell.classList.add(selectedElement.type);
                    map[currentRow][currentCol] = `${selectedElement.type}`;
                }
            }
        }
    } else {
        if (totalUnits <= selectedElement.time) {
            if (totalUnits === 1 && selectedElement.time === 2) {
                for (let i = 0; i < elementShape.length; i++) {
                    for (let j = 0; j < elementShape[i].length; j++) {
                        const currentRow = row + i - 1;
                        const currentCol = col + j - 1;
                        if (
                            currentRow >= 0 && currentRow < gridSize &&
                            currentCol >= 0 && currentCol < gridSize &&
                            elementShape[i][j] === 1
                        ) {
                            const mapCell = document.querySelector(
                                `.cell[data-row="${currentRow}"][data-col="${currentCol}"]`
                            );

                            mapCell.classList.remove('base');
                            mapCell.classList.add(selectedElement.type);
                            map[currentRow][currentCol] = `${selectedElement.type}`;
                        }
                    }
                }
                updateTimeOnPlacement();
            } else {
                endGame();
            }
        }
    }

    updateTimeOnPlacement();

    if (totalUnits <= 0) {
        endGame();
        mainHeader.innerText = `Game Over!`;

    } else {
        selectedElement = elements[Math.floor(Math.random() * elements.length)];
        createNextElement();
    }
}
function previewElementOnMap(event) {
    const cell = event.target;
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);

    const elementShape = selectedElement.shape;
    const previewCells = [];
    let previousCells = [];
    for (let i = 0; i < elementShape.length; i++) {
        for (let j = 0; j < elementShape[i].length; j++) {
            const currentRow = row + i;
            const currentCol = col + j;

            if (
                currentRow >= 0 &&
                currentRow < 11 &&
                currentCol >= 0 &&
                currentCol < 11 &&
                elementShape[i][j] === 1
            ) {
                const mapCell = document.querySelector(
                    `.cell[data-row="${currentRow}"][data-col="${currentCol}"]`
                );

                const previewCell = document.createElement('div');
                const hoveredCell = document.createElement('div');
                previewCell.classList.add('cell-preview');

                if (!mapCell.classList.contains('base')) {
                    previewCell.classList.add('occupied');

                } else {
                    previewCell.classList.add(selectedElement.type);
                }


                previewCells.push({ cell: previewCell, row: currentRow, col: currentCol });
                previousCells.push(previewCell.classList.contains('occupied'));
                if (mapCell) {
                    mapCell.appendChild(previewCell);
                    mapCell.appendChild(hoveredCell);
                }
            }
        }
    }
    canPlace = !previousCells.includes(true);

    cell.addEventListener('mouseleave', () => {
        previewCells.forEach(({ cell }) => {
            cell.remove();
        });
    }, { once: true });
    cell.addEventListener('click', placeElementOnMap);
}



function calculatePointsForEdgeOfForest(map) {
    let points = 0;

    for (let i = 0; i < map.length; i++) {
        if (map[0][i] === 'forest' || map[map.length - 1][i] === 'forest' || map[i][0] === 'forest' || map[i][map[0].length - 1] === 'forest') {
            points++;
        }
    }

    return points;
}

function calculatePointsForSleepyValley(map) {
    let points = 0;

    map.forEach(row => {
        const forestCount = row.filter(cell => cell === 'forest').length;
        if (forestCount === 3) {
            points += 4;
        }
    });

    return points;
}

function calculatePointsForBorderlands(map) {
    let points = 0;

    map.forEach(row => {
        if (row.every(cell => cell !== '')) {
            points += 6;
        }
    });
    for (let i = 0; i < map[0].length; i++) {
        const column = map.map(row => row[i]);
        if (column.every(cell => cell !== '')) {
            points += 6;
        }
    }

    return points;
}

function calculatePointsForWateringPotatoes(map) {
    let points = 0;

    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[0].length; col++) {
            if (map[row][col] === 'water') {
                if (
                    (row > 0 && map[row - 1][col] === 'farm') ||
                    (row < map.length - 1 && map[row + 1][col] === 'farm') ||
                    (col > 0 && map[row][col - 1] === 'farm') ||
                    (col < map[0].length - 1 && map[row][col + 1] === 'farm')
                ) {
                    points += 2;
                }
            }
        }
    }

    return points;
}

function calculatePointsForTreeLine(map) {
    let maxTreeLineLength = 0;
    let currentTreeLineLength = 0;
    let counts = {};

    for (let col = 0; col < map[0].length; col++) {
        currentTreeLineLength = 0;
        for (let row = 0; row < map.length; row++) {
            if (map[row][col] === 'forest') {
                currentTreeLineLength++;
            } else {
                if (currentTreeLineLength > maxTreeLineLength) {
                    maxTreeLineLength = currentTreeLineLength;
                }
                currentTreeLineLength = 0;
            }
        }
        if (currentTreeLineLength > maxTreeLineLength) {
            maxTreeLineLength = currentTreeLineLength;
        }
        if (maxTreeLineLength > 0) {
            counts[maxTreeLineLength] = (counts[maxTreeLineLength] || 0) + 1;
        }
    }

    let points = 0;
    for (let length in counts) {
        if (counts[length] === 1) {
            points += 2 * length;
        }
    }
    return points;
}

function calculatePointsForWealthyTown(map) {
    let points = 0;

    function countDifferentTerrains(row, col) {
        const terrains = new Set();
        if (row > 0 && map[row - 1][col] !== '') {
            terrains.add(map[row - 1][col]);
        }
        if (row < map.length - 1 && map[row + 1][col] !== '') {
            terrains.add(map[row + 1][col]);
        }
        if (col > 0 && map[row][col - 1] !== '') {
            terrains.add(map[row][col - 1]);
        }
        if (col < map[0].length - 1 && map[row][col + 1] !== '') {
            terrains.add(map[row][col + 1]);
        }
        return terrains.size >= 3;
    }

    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[0].length; col++) {
            if (map[row][col] === 'village' && countDifferentTerrains(row, col)) {
                points += 3;
            }
        }
    }
    return points;
}

function calculatePointsForWateringCanal(map) {
    let points = 0;

    for (let col = 0; col < map[0].length; col++) {
        let waterCount = 0;
        let farmCount = 0;
        let hasWater = false;
        let hasFarm = false;

        for (let row = 0; row < map.length; row++) {
            if (map[row][col] === 'water') {
                waterCount++;
                hasWater = true;
            } else if (map[row][col] === 'farm') {
                farmCount++;
                hasFarm = true;
            }
        }

        if (hasWater && hasFarm && waterCount === farmCount) {
            points += 4;
        }
    }

    return points;
}

function calculatePointsForMagiciansValley(map) {
    let points = 0;

    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[0].length; col++) {
            if (map[row][col] === 'water') {
                if (
                    (row > 0 && map[row - 1][col] === 'mountain') ||
                    (row < map.length - 1 && map[row + 1][col] === 'mountain') ||
                    (col > 0 && map[row][col - 1] === 'mountain') ||
                    (col < map[0].length - 1 && map[row][col + 1] === 'mountain')
                ) {
                    points += 3;
                }
            }
        }
    }

    return points;
}

function calculatePointsForEmptySite(map) {
    let points = 0;

    function isEmptyCell(row, col) {
        return row >= 0 && row < map.length &&
            col >= 0 && col < map[0].length &&
            map[row][col] === '';
    }

    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[0].length; col++) {
            if (map[row][col] === 'village') {
                if (isEmptyCell(row - 1, col)) points += 2; // Check above
                if (isEmptyCell(row + 1, col)) points += 2; // Check below
                if (isEmptyCell(row, col - 1)) points += 2; // Check left
                if (isEmptyCell(row, col + 1)) points += 2; // Check right
            }
        }
    }
    return points;
}

function calculatePointsForTerracedHouse(map) {
    let maxContiguousVillageLength = 0;
    let currentContiguousVillageLength = 0;

    for (let row = 0; row < map.length; row++) {
        currentContiguousVillageLength = 0;
        for (let col = 0; col < map[0].length; col++) {
            if (map[row][col] === 'village') {
                currentContiguousVillageLength++;
            } else {
                if (currentContiguousVillageLength > maxContiguousVillageLength) {
                    maxContiguousVillageLength = currentContiguousVillageLength;
                }
                currentContiguousVillageLength = 0;
            }
        }
        if (currentContiguousVillageLength > maxContiguousVillageLength) {
            maxContiguousVillageLength = currentContiguousVillageLength;
        }
    }

    return 2 * maxContiguousVillageLength;
}

function calculatePointsForOddNumberedSilos(map) {
    let points = 0;

    for (let col = 0; col < map[0].length; col++) {
        if (col % 2 !== 0) {
            let isFullColumn = true;
            for (let row = 0; row < map.length; row++) {
                if (map[row][col] === '') {
                    isFullColumn = false;
                    break;
                }
            }
            if (isFullColumn) {
                points += 10;
            }
        }
    }

    return points;
}

function calculatePointsForRichCountryside(map) {
    let points = 0;

    for (let row = 0; row < map.length; row++) {
        const terrainTypes = new Set();
        for (let col = 0; col < map[0].length; col++) {
            terrainTypes.add(map[row][col]);
        }
        if (terrainTypes.size >= 5) {
            points += 4;
        }
    }

    return points;
}

function calculatePointsForMission(map, mission) {
    let points = 0;

    switch (mission.title) {
        case 'Edge of the forest':
            points = calculatePointsForEdgeOfForest(map);
            break;
        case 'Sleepy valley':
            points = calculatePointsForSleepyValley(map);
            break;
        case 'Borderlands':
            points = calculatePointsForBorderlands(map);
            break;
        case 'Watering potatoes':
            points = calculatePointsForWateringPotatoes(map);
            break;
        case 'Tree line':
            points = calculatePointsForTreeLine(map);
            break;
        case 'Watering canal':
            points = calculatePointsForWateringCanal(map);
            break;
        case 'Wealthy town':
            points = calculatePointsForWealthyTown(map);
            break;
        case `Magicians' valley`:
            points = calculatePointsForMagiciansValley(map);
            break;
        case 'Empty site':
            points = calculatePointsForEmptySite(map);
            break;
        case 'Terraced house':
            points = calculatePointsForTerracedHouse(map);
            break;
        case 'Odd numbered silos':
            points = calculatePointsForOddNumberedSilos(map);
            break;
        case 'Rich country side':
            points = calculatePointsForRichCountryside(map);
            break;
    }

    return points;
}

function calculatePointsForAllMissions(map, missions) {
    let totalPoints = 0;

    missions.forEach(mission => {
        const missionPoints = calculatePointsForMission(map, mission);
        totalPoints += missionPoints;
        missionInfoContainer.innerHTML += `Points for ${mission.title}: ${missionPoints} <br>`;
    });

    return totalPoints;
}
function endGame() {
    const totalPointsA = calculatePointsForAllMissions(map, missionsA);
    const totalPointsB = calculatePointsForAllMissions(map, missionsB);
    const totalPointsC = calculatePointsForAllMissions(map, missionsC);
    const totalPointsD = calculatePointsForAllMissions(map, missionsD);
    missionInfoContainer.innerHTML = '';
    displayMissionInfo(missionsA, 'A', totalPointsA);
    displayMissionInfo(missionsB, 'B', totalPointsB);
    displayMissionInfo(missionsC, 'C', totalPointsC);
    displayMissionInfo(missionsD, 'D', totalPointsD);

    const borderlandsScore = calculatePointsForBorderlands(map);
    missionInfoContainer.innerHTML += `Points for mission Borderlands: ${borderlandsScore} <br>`;
    totalPoints.innerText = `Total Points: ${totalPointsA + totalPointsB + totalPointsC + totalPointsD}`;
    mainHeader.innerText = `Game Over!`;
}
function createNextElement() {
    const elementDiv = document.createElement('div');
    elementDiv.classList.add('element-div');

    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const cell = createCellElement(row, col);


            if (selectedElement.shape[row][col] === 1) {
                cell.classList.add(selectedElement.type);
            } else {
                cell.classList.add('base');
            }
            elementDiv.appendChild(cell);
        }
    }

    nextElementContainer.innerHTML = '';
    nextElementContainer.appendChild(elementDiv);

    timeUnit.textContent = `Time Unit: ${selectedElement.time}`;
}

function createCellElement(row, col) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.classList.add('base');
    cell.dataset.row = row;
    cell.dataset.col = col;
    return cell;
}

function updateTimeOnPlacement() {
    totalUnits -= selectedElement.time;
    remainingUnitsTotal.textContent = `Remaining Units in Total: ${totalUnits}`;
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function rotateMatrix(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const rotatedMatrix = Array.from({ length: cols }, () => Array(rows).fill(0));

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            rotatedMatrix[col][rows - 1 - row] = matrix[row][col];
        }
    }

    return rotatedMatrix;
}

function flipMatrix(matrix) {
    return matrix.map(row => row.slice().reverse());
}

function rotateElement() {
    selectedElement.shape = rotateMatrix(selectedElement.shape);
    createNextElement();
}

function flipElement() {
    selectedElement.shape = flipMatrix(selectedElement.shape);
    createNextElement();
}





renderMap();
createNextElement();
const mapCells = document.querySelectorAll('.cell');

mapCells.forEach(cell => {
    cell.addEventListener('mouseover', previewElementOnMap, { once: true });
    cell.addEventListener('mouseleave', () => {
        cell.addEventListener('mouseover', previewElementOnMap, { once: true });
    });
    cell.addEventListener('click', placeElementOnMap);

});
rotateButton.addEventListener('click', rotateElement);
flipButton.addEventListener('click', flipElement);