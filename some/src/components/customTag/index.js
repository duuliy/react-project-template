class List extends React.Component {
    constructor(props){
        super(props);
        this.upData=this.upData.bind(this);
    }
    
    upData(e){
        this.props.upData(this.props.index,e.target.value)
    }

    render() {
        return (<div><span type="text" onBlur={this.upData} defaultValue={this.props.item?this.props.item:""}>{this.props.val}</span>
            <span style={{fontSize:18,color:'#ff0000',cursor:'pointer'}} onClick={this.props.delete} data-index={this.props.index}>×</span></div>)
    }
}
export default class Lists extends React.Component {
    constructor(props) {
        super(props);
        inputV:'',
        this.add=this.add.bind(this);
        this.delete=this.delete.bind(this);
        this.upData=this.upData.bind(this);
        this.state={
            lists:[]
        }
    }

    add(){
        var lists=this.state.lists;
        lists.push("");
        this.setState({lists:lists})
    }

    delete(e){
        var index=e.target.getAttribute("data-index");
        var lists=this.state.lists;
        lists.splice(index,1);
        this.setState({lists:lists})
    }

    upData(i,x){
        var lists=this.state.lists;
        lists[i]=x;
        console.log(lists);
        this.setState({lists:lists});
    }

    render() {
        return (<div>
            <input onBlur={(e)=>{this.setState({inputV:e.target.value})}} style={{height:24,padding:4,border:'1px solid #e5e5e5'}}/>
            <span onClick={this.add} style={{marginLeft:10,cursor:'pointer'}} >添加</span>
            {this.state.lists.map(function (item,index) {
                return <List key={item?item:index} val={this.state.inputV} index={index} delete={this.delete} upData={this.upData}  item={item}/>
            }.bind(this))}
            </div>)
    }
}