import styled from 'styled-components/native'

export const HeaderWrapper = styled.View`
    align-items: center;
    padding-top: 15;
    padding-bottom: 15;
    background-color: ${props => props.backgroundColor || "palevioletred"};
    margin-top: 15;
`

export const HeaderText = styled.Text`
    font-size: 30;
    color: white;
`

export const SubHeader = styled.Text`
    color: navy;
    font-size: 30;
    margin-top: 15;
`

export const InformationBar = styled.View`
    height: 50;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.backgroundColor || "lightseagreen"};
`

export const InformationBarText = styled.Text`
    text-transform: capitalize;
    color: white;
`