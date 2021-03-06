const trackSize = 40;
const trackCols = 20;
const trackRows = 15;
const trackGap = 0;
const levelOne = [ 8, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6,
                    6, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                    8, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                    1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 6, 1, 1, 1, 1, 1, 0, 0, 0, 1,
                    1, 0, 0, 0, 7, 1, 8, 1, 1, 6, 8, 6, 1, 1, 6, 1, 7, 0, 0, 1,
                    1, 0, 0, 1, 1, 0, 0, 1, 6, 8, 6, 1, 0, 0, 0, 0, 1, 0, 0, 1,
                    1, 0, 0, 1, 0, 0, 0, 0, 1, 6, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
                    8, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 7, 0, 0, 1, 0, 0, 1,
                    6, 0, 0, 1, 0, 0, 7, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                    1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 7, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                    1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 7, 0, 0, 1,
                    1, 2, 3, 7, 4, 4, 1, 6, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
                    1, 5, 5, 5, 0, 0, 8, 8, 1, 0, 0, 0, 1, 8, 0, 0, 0, 0, 0, 1,
                    1, 0, 0, 0, 0, 0, 1, 8, 6, 1, 6, 8, 8, 6, 1, 0, 0, 0, 0, 1,
                    1, 1, 1, 1, 1, 1, 8, 6, 8, 6, 8, 8, 6, 8, 1, 1, 1, 1, 8, 6];

var trackGrid = [];

const roadTile = 0;
const wallTile = 1;
const treeTile = 6;
const treeTile2 = 8;
const flagTile = 7;
const waymarkTile = 4;
const antiCheatTile = 5;
const firstPlayerStartTile = 2;
const secondPlayerStartTile = 3;


function returnTileTypeAtColRow(col, row) {
    if(col >= 0 && col < trackCols &&                       //no bugs
        row >= 0 && row < trackRows) {
        var trackIndexUnderCoord = rowColToArrayIndex(col, row);
        var tile = trackGrid[trackIndexUnderCoord];
        return tile;
    } else {
        return wallTile;
    }
}

function carTrackHandling(car){
    var carTrackCol = Math.floor(car.x / trackSize);
    var carTrackRow = Math.floor(car.y / trackSize);
    var trackIndexUnderCar = rowColToArrayIndex(carTrackCol, carTrackRow);

    if(carTrackCol >= 0 && carTrackCol < trackCols &&                       //no bugs
        carTrackRow >= 0 && carTrackRow < trackRows) {

        var tile = returnTileTypeAtColRow(carTrackCol, carTrackRow);
        var hitObstacle;

        //anticheat system
        if(car.waymarkReached && (tile==firstPlayerStartTile||tile==secondPlayerStartTile)){          //if waymark reached and finish line crossed
            car.finishLineReached = true;
            showEndScreen = true;
        } else if(tile==waymarkTile){                                                                                        //if waymark reached
            car.waymarkReached = true;
        }

        //check if car hit obstacle
        if(!car.waymarkReached){
            hitObstacle = tile==wallTile||tile==antiCheatTile||tile==treeTile||tile==flagTile||tile==treeTile2;
        } else {                                                                                                            //waymark reached
            hitObstacle = tile==wallTile||tile==treeTile||tile==flagTile||tile==treeTile2;
        }

        if(hitObstacle) {                  //wall
            car.x -= Math.cos(car.ang) * car.speed;
            car.y -= Math.sin(car.ang) * car.speed;
            car.speed *= -0.4;
        }
    }
}


function rowColToArrayIndex(col, row){
    return col + trackCols * row;           //function to return index of track at a column and a row
}

function drawTracks(){
    var arrayIndex = 0;
    var drawTileX = 0;
    var drawTileY = 0;

    for(var eachRow=0;eachRow<trackRows;eachRow++) {                                        //two for loops to iterate through drawing the cols and rows

        for(var eachCol=0;eachCol<trackCols;eachCol++) {                                    //eachRow and eachCol are the loop variables
            var tileKind = trackGrid[arrayIndex];
            var useImage = trackPics[tileKind];
            canvasContext.drawImage(useImage, drawTileX, drawTileY);        //draw

            drawTileX += trackSize;
            arrayIndex++;
        }
        drawTileY += trackSize;
        drawTileX = 0;
    }
}
