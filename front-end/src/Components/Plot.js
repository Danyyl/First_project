import React from "react";
import axios from "axios";
import { Map as LeafletMap, TileLayer, Marker} from 'react-leaflet';
import L from 'leaflet';
import i18n from "i18next";

var greenIcon = L.icon({
    iconUrl: require('./marker-icon.png'),
    iconRetinaUrl: require('./marker-icon.png'),
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(25,40),
});

class Plot extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        position: [this.props.arr.placex, this.props.arr.placey],
        center : [this.props.arr.placex, this.props.arr.placey],
        type: this.props.arr.type,
        field:this.props.arr.field,
        culture:this.props.arr.culture,
        readonly:true,
        id:props.arr.id,
        lng:this.props.lng,
        inf:i18n.init({
        lng: this.props.lng,
        resources: require(`./${this.props.lng}.json`)
        })
        };
        this.Save = this.Save.bind(this);
        this.Edit = this.Edit.bind(this);
        this.Change = this.Change.bind(this);
        this.Delete = this.Delete.bind(this);
        this.Getfield = this.Getfield.bind(this);
        this.toCheck = this.toCheck.bind(this);
        this.Map = this.Map.bind(this);
    }

    toCheck(temp){
        if(temp){
            return("cheked")
        }
        else{
            return("")
        }
    }

    Change(e){
          if(e.target.id === "place") {
            this.setState({position: e.target.value});
        }

        if(e.target.id === "type") {
            this.setState({type: e.target.value});
        }

        if(e.target.id === "field") {
            this.setState({field: e.target.value});
        }

         if(e.target.id === "culture") {
            this.setState({culture: e.target.value});
        }
    }

    Edit(e){
        if(this.state.readonly === true){
            this.setState({readonly:false});
        }
        else{
            this.setState({readonly:true});
        }
    }

    Save(){
        const answer = this.Save_plot();
        answer.then(()=>{alert("Done")}, ()=>{alert("Mistake")});
    }

      async Save_plot() {

      const response1 = await axios({
          method: 'put',
          url: 'http://localhost:8000/user/plots/',
          headers: {
              "content-type": "application/json",
               "authorization": 'Bearer ' + localStorage.getItem('asset'),
          },
          data: {
              "id": this.state.id,
              "type": this.state.type,
              "field": this.Getfield(),
              "culture": this.state.culture,
              "place" : `${this.state.position[0]} ${this.state.position[1]}`,
          }
      });
      this.props.func();
  }

  Getfield(){
        var temp = "";
        if(this.state.field === true){
            temp = "True";
        }
        else{
            temp = "False";
        }
        return(temp)
  }


  Delete(){
      const answer = this.Delete_plot();
        answer.then(()=>{alert("Done")}, ()=>{alert("Mistake")});
        this.props.func();
  }

  async Delete_plot(){
     const response1 = await axios({
          method: 'delete',
          url: 'http://localhost:8000/user/plots/',
          headers: {
              "content-type": "application/json",
               "authorization": 'Bearer ' + localStorage.getItem('asset'),
          },
          data: {
              "id": this.state.id,
          }
      });

  }

  Map(e){
        if(this.state.readonly !== true) {
            console.log(e.target);
            var temp = e.target.zoom;
            this.setState({position: [e.latlng.lat, e.latlng.lng]});
            e.target.zoom = temp;
        }
  }


    render(){
        return(
            <div className='contentdiv'>
                <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/leaflet.css"/>
                <div className='item_block'>
                <h2>{i18n.t('place')}</h2>
                <LeafletMap
                    center={this.state.center}
                    zoom={12}
                    maxZoom={20}
                    attributionControl={true}
                        zoomControl={true}
                        doubleClickZoom={false}
                        scrollWheelZoom={true}
                        dragging={true}
                        animate={true}
                        easeLinearity={0.35}
                    onClick={this.Map}
                >
                    <TileLayer
                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    />
                    <Marker position={this.state.position} icon={greenIcon}>

                    </Marker>

                </LeafletMap>
               {/*<input value={`${this.state.position[0]} ${this.state.position[0]}`} id="place" name="place" type="text"  readOnly={this.state.readonly} onChange={this.Change} />! */}
               </div>
                <div className='item_block'>
                <h2>{i18n.t('type')}</h2>
                <input value={this.state.type} id="type" name="type" type="text"  readOnly={this.state.readonly} onChange={this.Change} />
                </div>
                <div className='item_block'>
                <h2>{i18n.t('field')}</h2>
                <input checked={this.toCheck(this.state.field)} id="field" name="field" type="checkbox"  readOnly={this.state.readonly} onChange={this.Change} />
                </div>
                <div className='item_block'>
                <h2>{i18n.t('culture')}</h2>
                <input value={this.state.culture} id="culture" name="culture" type="text"  readOnly={this.state.readonly} onChange={this.Change} />
                </div>
                <div className='item_block' style={{textAlign:'right'}}>
                <button id = "edit" onClick={this.Edit}>{i18n.t('edit')}</button>
                <button id = "save" onClick={this.Save}>{i18n.t('save')}</button>
                <button id = "delete" onClick={this.Delete}>{i18n.t('delete')}</button>
                </div>

            </div>
        )
    }
}
export default Plot;