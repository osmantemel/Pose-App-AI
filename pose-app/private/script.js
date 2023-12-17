var outerDiv = document.getElementById('outerDiv');
var movingBox = document.getElementById('movingBox');
var staticBox = document.getElementById('staticBox');
var scoreDiv = document.getElementById('scoreDiv');
var step = 20;
var score = 0;
var offsetX = 0;
var offsetY = 0;


function generateRandomPosition() {
    var maxX = outerDiv.clientWidth - step;
    var maxY = outerDiv.clientHeight - step;

    var randomX = Math.floor(Math.random() * (maxX / step)) * step;
    var randomY = Math.floor(Math.random() * (maxY / step)) * step;

    return { x: randomX, y: randomY };
}

function placeStaticBox() {
    var randomPosition = generateRandomPosition();
    staticBox.style.left = randomPosition.x + 'px';
    staticBox.style.top = randomPosition.y + 'px';
}

function checkCollision(box1, box2) {
    var box1Rect = box1.getBoundingClientRect();
    var box2Rect = box2.getBoundingClientRect();

    return (
        box1Rect.left < box2Rect.right &&
        box1Rect.right > box2Rect.left &&
        box1Rect.top < box2Rect.bottom &&
        box1Rect.bottom > box2Rect.top
    );
}

function updateScore() {
    score++;
    scoreDiv.textContent = 'Score: ' + score;
}

function moveBox(box, deltaX, deltaY) {
    var currentLeft = parseInt(box.style.left) || 0;
    var currentTop = parseInt(box.style.top) || 0;

    var newLeft = Math.max(0, Math.min(currentLeft + deltaX, outerDiv.clientWidth - box.clientWidth));
    var newTop = Math.max(0, Math.min(currentTop + deltaY, outerDiv.clientHeight - box.clientHeight));

    box.style.left = newLeft + 'px';
    box.style.top = newTop + 'px';

    console.log('X: ' + newLeft + ', Y: ' + newTop);
}

document.addEventListener('keydown', function (e) {
    switch (e.key) {
        case 'ArrowUp':
            moveBox(movingBox, 0, -step);
            break;
        case 'ArrowDown':
            moveBox(movingBox, 0, step);
            break;
        case 'ArrowLeft':
            moveBox(movingBox, -step, 0);
            break;
        case 'ArrowRight':
            moveBox(movingBox, step, 0);
            break;
    }

    if (checkCollision(movingBox, staticBox)) {
        updateScore();
        placeStaticBox();
    }
});

// Fare ile sürükleme olaylarını dinle
movingBox.addEventListener('mousedown', function (e) {
    offsetX = e.clientX - movingBox.getBoundingClientRect().left;
    offsetY = e.clientY - movingBox.getBoundingClientRect().top;
    movingBox.style.cursor = 'grabbing';
});

document.addEventListener('mouseup', function () {
    movingBox.style.cursor = 'grab';
});

document.addEventListener('mousemove', function (e) {
    var x = e.clientX - offsetX - outerDiv.getBoundingClientRect().left;
    var y = e.clientY - offsetY - outerDiv.getBoundingClientRect().top;

    x = Math.max(0, Math.min(x, outerDiv.clientWidth - movingBox.clientWidth));
    y = Math.max(0, Math.min(y, outerDiv.clientHeight - movingBox.clientHeight));

    movingBox.style.left = x + 'px';
    movingBox.style.top = y + 'px';

    if (checkCollision(movingBox, staticBox)) {
        updateScore();
        placeStaticBox();
    }
});

// İlk statik kutuyu yerleştir
placeStaticBox();