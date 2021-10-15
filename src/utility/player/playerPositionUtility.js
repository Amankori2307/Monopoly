// import { delay } from "../playerUtility";

export const calculatePlayersOnCurrentSite = (site, players, totalPlayers) => {
    let playersOnCurrentSite = {
        playerIds: [],
        count: 0
    };
    for (let playerId = 0; playerId < totalPlayers; playerId++) {
        if (players[playerId].site === site) {
            playersOnCurrentSite.count++;
            playersOnCurrentSite.playerIds.push(playerId)
        }
    }
    return playersOnCurrentSite;
}


export const adjustHelper = (playersOnCurrentSite, currentPlayerId) => {
    let { count, playerIds } = playersOnCurrentSite;
    if (count > 0) {
        playerIds = playerIds.sort(function (a, b) {
            return a - b;
        })
        let idx = playerIds.indexOf(currentPlayerId)
        let gap = 10;
        return [(idx * gap) - (((count - 1) / 2) * gap), idx]
    } else {
        return [0, 1]
    }
}


export const updatePostionDataAccoringToPlayersOnThatSite = (positionData, players, totalPlayers, currentPlayerId) => {
    let site = positionData.site
    let playersOnCurrentSite = calculatePlayersOnCurrentSite(site, players, totalPlayers)
    let [adjust, zIndex] = adjustHelper(playersOnCurrentSite, currentPlayerId)
    positionData.zIndex = zIndex
    if ((site >= 0 && site <= 9) || (site >= 20 && site <= 29)) {
        positionData.top -= adjust
        positionData.bottom += adjust
    }
    else if ((site >= 10 && site <= 19) || (site >= 30 && site <= 39)) {
        positionData.left -= adjust
        positionData.right += adjust

    }
    return positionData
}

export const playPlayerMoveAudio = (playerMoveAudio, playAudio) => {
    if (playAudio) {
        playerMoveAudio.load()
        playerMoveAudio.play()
    }
}

export const setPlayerPositionHelper = (positionData, players, totalPlayers, currentPlayerId, playerRef, playerMoveAudio, playAudio) => {
    playPlayerMoveAudio(playerMoveAudio, playAudio)
    positionData = updatePostionDataAccoringToPlayersOnThatSite(positionData, players, totalPlayers, currentPlayerId)
    playerRef.style.zIndex = positionData.zIndex;
    playerRef.style.top = positionData.top != null ? positionData.top + "px" : "unset";
    playerRef.style.right = positionData.right != null ? positionData.right + "px" : "unset";
    playerRef.style.bottom = positionData.bottom != null ? positionData.bottom + "px" : "unset";
    playerRef.style.left = positionData.left != null ? positionData.left + "px" : "unset";
}

// const setPlayerPositionRecursive = async (turningPoints) => {
//     if (turningPoints.length === 0) {
//         setPlayerPosition(currentPlayer.current.site, isMounted.current)
//         await delay(400)
//         setIsMoving(id, false)
//         return;
//     }
//     setPlayerPosition(turningPoints[0], isMounted.current)
//     await delay(400)
//     turningPoints.shift()
//     setPlayerPositionRecursive(turningPoints)

//     // setPlayerPositionRecursiveHelper(turningPoints, {...positions.current[currentPlayer.current.site]}, playersDataRef.current.players, playersDataRef.current.totalPlayers, id, playerRef.current, playerMoveAudio, isMounted.current, setIsMoving)
// }