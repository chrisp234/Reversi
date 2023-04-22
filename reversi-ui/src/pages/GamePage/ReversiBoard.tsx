import { makeStyles } from '@mui/styles';
import React from 'react';
import classNames from 'classnames';
import { useCurrentUser } from '../../stores/CurrentUserStore';

type TTileState = 'black' | 'white' | 'empty';

interface IReversiBoardProps {
    state: IGameState;
}

interface IPlayer {
    userName: string;
    id: number;
    color: Omit<TTileState, 'empty'>;
}

interface IGameState {
    whoseTurn: Omit<TTileState, 'empty'>;
    board: TTileState[][];
    players: IPlayer[];
}

interface IGamePiece {
    color: TTileState;
    interactive: boolean;
}

const useStyles = makeStyles({
    gamePiece: {
        borderRadius: '50%',
        border: '1px solid gray',
        height: '100%',
        width: '100%'
    },
    emptySpace: {
        backgroundColor: 'transparent',
        border: 'unset',
    },
    interactive: {
        '&:hover': {
            border: '1px solid gray',
            backgroundColor: 'red'
        }
    }
})

export const GamePiece = ({ color, interactive }: IGamePiece) => {
    const classes = useStyles();
    return (
        <div style={{width: '32px', height: '32px', border: '1px solid pink', padding: '8px'}}>
            {color !== 'empty' && <div className={classes.gamePiece} style={{backgroundColor: color}}/>}
            {color === 'empty' && <div className={classNames(classes.gamePiece, classes.emptySpace, classes.interactive && interactive)}/>}
        </div>
    );
}

export const ReversiBoard = ({ state }: IReversiBoardProps) => {
    const { board, whoseTurn, players} = state;

    const currentUser = useCurrentUser((state) => state.currentUser)
    const currentTurnPlayerId = players.find((player) => player.color === whoseTurn)?.id
    const isYourTurn = currentTurnPlayerId === currentUser.id;
    return(
        <div style={{marginTop: '144px'}}>
        {board.map((row) => (
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {row.map((piece) => {
                return(<GamePiece color={piece} interactive={isYourTurn}/>)
            })}
            </div>
        ))}
        </div>
    )
}