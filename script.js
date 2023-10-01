const gameContainer = document.querySelector('.game-container');
const scoreElement = document.getElementById('score'); // Get the score element
const spawnTime = 1500; // Controls spwan time in milisecons
const monsterCount = 8; // Controls how many monsters will be spawned
let score = 0; // Initialize the score

function getRandomPosition() {
    const maxX = gameContainer.clientWidth - 100; // Adjust the width of monsters (e.g., 100px)
    const maxY = gameContainer.clientHeight - 100; // Adjust the height of monsters (e.g., 100px)
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    return { x: randomX, y: randomY };
}

function getRandomMonsterImage() {
    const randomMonsterNumber = Math.floor(Math.random() * 6) + 1; // Randomly choose between 1 and 6
    return `img/${randomMonsterNumber}.png`;
}

function spawnMonsters() {
    for (let i = 0; i < monsterCount; i++) {
        const monster = document.createElement('div'); // Create a new monster element
        const monsterImage = getRandomMonsterImage();
        const position = getRandomPosition();

        monster.className = 'monster'; // Add the 'monster' class to the monster element
        monster.style.left = `${position.x}px`;
        monster.style.top = `${position.y}px`;
        monster.style.background = `url(${monsterImage}) center/cover no-repeat`;

        monster.onclick = () => {
            const audio = new Audio("https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-epic-stock-media/esm_8bit_explosion_medium_bomb_boom_blast_cannon_retro_old_school_classic_cartoon.mp3");
            audio.volume = 0.5;
            audio.play();
            monster.style.background = `url('img/explosion.gif') center/cover no-repeat`; // Show explosion
            monster.style.pointerEvents = 'none'; // Disable further clicks

            // Update the score
            score++;
            scoreElement.textContent = score; // Update the score displayed in the HTML

            setTimeout(() => {
                monster.remove(); // Remove the monster from the DOM
            }, 1000);
        };

        gameContainer.appendChild(monster); // Add the monster to the game container

        // Automatically remove the monster after spawnTime
        setTimeout(() => {
            monster.remove();
        }, spawnTime - (spawnTime / 10));
    }
}

function start() {
    document.getElementById('start').remove();
    spawnMonsters()
    setInterval(spawnMonsters, spawnTime);
    document.getElementById('bg-music').play();
}
