import ApexCharts from 'apexcharts'

const url = 'http://localhost:8080/data.json'; 
const container = document.querySelector('.container');
let counter = 1;

fetch(url)
.then(response => response.json())
.then(data => {
  data.profiles.forEach((profile) => {
    let values = []
    let my_labels = []

    profile.data.forEach((data) => {
      values.push(data.value)
      my_labels.push(data.label)
    })
    
    // templating
    const template = `
                      <h2>${profile.title}</h2>
                      <p id="clone${counter}">Clone</p>
                      <div id="chart${counter}" style="width: 25vw;">
                    
                      </div>
                     `
    //  insert template in container
    container.insertAdjacentHTML('beforeend', template);
   
    // clone btn
    let clone = document.getElementById(`clone${counter}`);
   
    clone.addEventListener('click', () => {
      const template_clone = `
                              <h2>${profile.title}</h2>
                              
                              <div id="chartClone${counter}" style="width: 25vw;">
                            
                              </div>
                            `

      container.insertAdjacentHTML('beforeend', template_clone);

      // apexchart call clone ==============
      var options = {
        series: values,
        chart: {
          type: 'donut',
        },
        labels: my_labels,
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      };
      
      var chart = new ApexCharts(document.querySelector(`#chartClone${counter}`), options);
      chart.render();

      counter += 1

      clone.style.display = 'none'
    })

   

    // apexchart call ==============
    var options = {
      series: values,
      chart: {
        type: 'donut',
      },
      labels: my_labels,
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    };
    
    var chart = new ApexCharts(document.querySelector(`#chart${counter}`), options);
    chart.render();

    counter += 1
  })
})

