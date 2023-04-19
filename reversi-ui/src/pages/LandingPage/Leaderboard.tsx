import { Box, Card, Tab, Table, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { fetchLeaderboard, ILeader } from '../../services/LeaderboardService';

export const Leaderboard = () => {
    const [leaders, setLeaders] = useState<ILeader[]>();

    const loadLeaders = async() => {
        const loadedLeaders = await fetchLeaderboard();
        setLeaders(loadedLeaders);
    }

    useEffect(() => {
        loadLeaders()
    }, [])

    return(
        <Box sx={{margin: '16px', marginTop: '0px', width: '500px'}}>
        <Card sx={{padding: '16px'}} elevation={5}>
        <Typography variant="h6">Leaderboard</Typography>
        <Table>
            <TableHead>
                <TableCell>
                    Username
                </TableCell>
                <TableCell>ELO</TableCell>
            </TableHead>
            {leaders?.map(({username, elo}) => (
            <TableRow>
            <TableCell>{username}</TableCell>
            <TableCell>{elo}</TableCell>
        </TableRow>
            ))}

        </Table>
        </Card>

        </Box>
    )
}