import { Card, Typography } from '@mui/material';
import React from 'react';


export const AboutReversi = () => (
    <Card elevation={5} sx={{padding: '16px', margin: '16px', marginTop: '0px'}}>
        <Typography variant="h6">About Reversi</Typography>
        <Typography sx={{textAlign: 'start'}} component="div">There are sixty-four identical game pieces called disks, which are light on one side and dark on the other. Players take turns placing disks on the board with their assigned color facing up. During a play, any disks of the opponent's color that are in a straight line and bounded by the disk just placed and another disk of the current player's color are turned over to the current player's color. The objective of the game is to have the majority of disks turned to display one's color when the last playable empty square is filled.
        <div style={{minHeight: '16px'}}/>
        <Typography paragraph sx={{textAlign: 'start'}}>The modern version of the game—the most regularly used rule-set, and the one used in international tournaments—is marketed and recognized as Othello. It was patented in Japan in 1971 by Goro Hasegawa, then a 38-year-old salesman. Hasegawa initially explained that Othello was an improvement on Reversi,but from around 2000, he began to claim that he invented it in Mito regardless of Reversi. Hasegawa also claims that the origin of Reversi/Othello dates back 5,000 years.</Typography>
</Typography>
    </Card>
)