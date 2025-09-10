export const BG_PARTICLES_CONFIG = {
            "particles":{
            "number": {
                "value": 30,
                    "density": {
                    "enable": true,
                    "value_area": 2000
                },
            },
            "color": {
                "value": "#10A375"
            },
            "shape": {
                "type": "polygon",
                "polygon": {
                    "nb_sides": 8
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 500,
                    "height": 500
                }
            },
            "size": {
              "value": 500,           
              "random": true,       
              "anim": {
                "enable": false,    
                "speed": 40,        
                "size_min": 400,    
                "sync": false       
              }
            },
            "opacity": {
                "value": 0.1,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.01,
                    "sync": false
                }
            },
            "line_linked": {
              "enable": false,
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },"retina_detect": true}