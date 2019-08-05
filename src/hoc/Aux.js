const aux = props => props.children;

export default aux;

/* Dus dit ding is alleen maar een verpakking voor meerdere JSX-elementen. 
Aux ontvangt alle JSX vanaf de component die Aux rendert (Kat in dit geval) 
en retourneert alleen de children, zodat er geen onnodige div-lagen ontstaan */