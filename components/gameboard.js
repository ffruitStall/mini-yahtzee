import React, {useState, useEffect, useCallback} from "react";
import { Text, View, Pressable } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { Row, Grid } from "react-native-easy-grid";
import style from "../styles/style"

let board = [];
let spotCount = [0, 0, 0, 0, 0, 0];



const dice = 5;
const throws = 3;
const turns = 6;

export default function Gameboard() {
    
    
    const spotSum = spotCount.reduce((partialSum, a) => partialSum + a, 0);
    const [score, setScore] = useState(0);
    const [throwsLeft, setThrowsLeft] = useState(throws);
    const [status, setStatus] = useState('Throw dice to begin game');
    const [selectStatus, setSelectStatus] = useState(false);
    const [selectedDice, setSelectedDice] = useState(new Array(dice).fill(false));
    const [selectedSpots, setSelectedSpots] = useState(new Array(6).fill(false));
    const [turn, setTurn] = useState(turns);
    const diceRow = [];
    const scoreRow = [];


    if(throwsLeft < 3) {
        for (let i = 0; i < dice; i++) {
        diceRow.push(
            <Pressable key={"row" + i} onPress={() => selectDice(i)}>      

            <MaterialCommunityIcons name={"dice-" + board[i]} size={50} color={getDiceColor(i)}/>
            
            </Pressable>
        );
        }
        
    }

    for (let i = 0; i < 6; i++) {
        scoreRow.push( 
            <Grid>

            <Row style={style.row}><Text style={style.gameinfo}>{spotCount[i]}</Text></Row>
            <Row><Pressable onPress={() => selectPoints(i)}><MaterialCommunityIcons name={"numeric-" + (i+1) + "-circle"} size={50} color={getPointColor(i)}/></Pressable></Row>

            </Grid>
        );
    }

    function getPointColor(i) {
        
        return selectedSpots[i] ? "black" : "steelblue";
    }

    function getDiceColor(i) {
        
        return selectedDice[i] ? "black" : "steelblue";
    }

    function selectDice(i) {

        let diceSelect = [...selectedDice];
        diceSelect[i] = selectedDice[i] ? false : true;
        setSelectedDice(diceSelect);
        
    }
   
    function selectPoints(i) {
        
        
        if(throwsLeft > 0) {
            window.alert("Throw 3 times before choosing points")
        }
        else if (selectedSpots[i]) {
            window.alert("Select another number");
        }
        else if (!selectStatus) {
        
        let pointSelect = [...selectedSpots];
        pointSelect[i] = selectedSpots[i] ? false : true;

        let count = board.reduce((n, x) => n + (x === i+1), 0);
        
        spotCount[i] = spotCount[i] + count * (i+1);

        
        setSelectedSpots(pointSelect);
        setSelectStatus(true);

        
        } else {
        window.alert("oh shiot");
        }
    }
        
    function throwDice() {

        let scoreCount = 0;

        if(throwsLeft > 0) {

            for (let i = 0; i < dice; i++) {
                if (!selectedDice[i]) {
                    let randomNumber = Math.floor(Math.random() * 6 + 1);
               
               board[i] = randomNumber;
           }
        }
        
        setThrowsLeft(throwsLeft-1);
        }
        else  if (!selectStatus){
            window.alert("Select points");
        }
        else if(turn > 0) {
        
            
            
            setScore(score + scoreCount);
            setSelectedDice(new Array(dice).fill(false));
            setTurn(turn-1);
            setThrowsLeft(throws);
            setSelectStatus(false);
        }
        
        else {
            setScore(0);
            setSelectedDice(new Array(dice).fill(false));
            setTurn(turn);
            setThrowsLeft(throws);
            
                }
            }

    return(
        <View style={style.gameboard}>
            <View style={style.flex}>{diceRow}</View>
            <Text style={style.gameinfo}>Turn: {turn}</Text>
            <Text style={style.gameinfo}></Text>
            <Text style={style.gameinfo}>Throws left: {throwsLeft}</Text>
            <Text style={style.gameinfo}>{status}</Text>
            <Pressable style={style.button} onPress={throwDice}>
                <Text style={style.buttonText}>Throw dice</Text>
            </Pressable>
            <Text style={style.gameinfo}>Total: {spotSum}</Text>
            
            <View style={style.flex}>{scoreRow}</View>
        </View>
    )
}
    
