import styled from 'styled-components/native'

export const ButtonWrapper = styled.TouchableHighlight`
    margin-top: 15;
    width: 150;
`

export const ButtonView = styled.View`
    background-color: ${props => props.backgroundColor || "palevioletred"};
`

export const ButtonText = styled.Text`
    font-size: 20;
    color: white;
    padding-top: 15;
    padding-bottom: 15;
    padding-left: 15;
    padding-right: 15;
`