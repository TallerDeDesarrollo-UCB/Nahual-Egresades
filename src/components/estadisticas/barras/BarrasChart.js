import React, {Component} from 'react'
import { Pie, Bar ,defaults } from 'react-chartjs-2'
import Nahual_Estadisticas from '../Estadisticas'
import { Label, Button, Message, Table, Search, Segment, Dropdown, Input } from 'semantic-ui-react'
const { REACT_APP_EGRESADES_NAHUAL_API }  = process.env;

class BarrasChart extends Component {
    constructor() {
        super();
        this.state ={
            egresades : [],
            cantidadEgresades :'',
            cantidadEmpleades:'',
            estudiantes : [],
            cantidadEstudiantes : '',
            cantidadPreInscripte : '',
            cantidadAbandonades:'',
            total:'',
            isLoaded:false
        }
        this.obtenerEgresades()
        this.obtenerEstudiantes()
    }
    
    obtenerEgresades() {
        console.log("Egresades")
        fetch(`${REACT_APP_EGRESADES_NAHUAL_API}/egresades/DTO`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.state.cantidadEgresades = result.response.length
                    this.state.cantidadEmpleades = result.response
                        .filter(item => item.esEmpleado).length
                    this.setState({
                        egresades: result.response,
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    obtenerEstudiantes() {
        fetch(`${REACT_APP_EGRESADES_NAHUAL_API}/estudiantes/DTO`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.state.total = result.response.length
                    this.state.cantidadEstudiantes = result.response
                        .filter(item => item.Estado ==='Alumne').length
                    this.state.cantidadPreInscripte = result.response
                        .filter(item => item.Estado ==='Pre-inscripte').length
                    this.state.cantidadAbandonades = result.response
                        .filter(item => item.Estado ==='Abandonade').length
                    this.setState({
                        estudiantes: result.response,
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render  () {
       return (
        
        <div>

          <Bar
    
            data={{
              labels: ['Alumnes', 'Egresades', 'Empleades', 'Abandonades', 'Pre-inscripte'],
              datasets: [
                {
                  label: "Total: "+this.state.total,
                  data: [this.state.cantidadEstudiantes, this.state.cantidadEgresades, this.state.cantidadEmpleades, this.state.cantidadAbandonades, this.state.cantidadPreInscripte],
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                  ],
                  borderWidth: 1,
                },
                // {
                //   label: 'Quantity',
                //   data: [47, 52, 67, 58, 9, 50],
                //   backgroundColor: 'orange',
                //   borderColor: 'red',
                // },
              ],
            }}
            height={500}
            width={800}
            options={{
              maintainAspectRatio: false,
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                  },
                ],
              },
              legend: {
                labels: {
                  fontSize: 25,
                },
              },
            }}
          />
        </div>
         )
    }
   

}
export default BarrasChart