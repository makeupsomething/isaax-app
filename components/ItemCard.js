import styled from 'styled-components/native'

export const ItemCardWrapper = styled.View`
    border-top-width: 3;
    margin-top: 15;
    background-color: white;
    border-color: ${props => props.borderColor || "palevioletred"};
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

export const ItemCardText = styled.Text`
    font-size: 30;
    padding-left: 30;
    padding-bottom: 30;
    padding-top: 30;
    color: navy;
`

export const StatusText  = styled.Text`
    color: ${props => props.color || "palevioletred"};
    padding-right: 30;
`