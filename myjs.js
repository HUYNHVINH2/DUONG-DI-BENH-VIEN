// joint.shapes.devs.Model = joint.shapes.devs.Model.extend({
//     markup: '<g class="element-node">'+
//                  '<rect class="body" stroke-width="0" rx="5px" ry="5px"></rect>'+
//                 '<text class="label" y="0.8em" xml:space="preserve" font-size="14" text-anchor="middle" font-family="Arial, helvetica, sans-serif">'+
//                   '<tspan id="v-18" dy="0em" x="0" class="v-line"></tspan>'+
//                 '</text>'+
//               '<g class="inPorts"/>' +
//               '<g class="outPorts"/>' +
//             '</g>',
//     portMarkup: '<g class="port port<%= id %>"><circle class="port-body"/></g>'
//     });
      
//     var canvas = $('#canvas');
//     var filter = $('#filter');
//     var addColor = $('#addColor');
//     var cells = [];
//     var message = $('#message');
//     var graph = new joint.dia.Graph();
    
//     var paper = new joint.dia.Paper({
//       el: canvas,
//       width: canvas.outerWidth(),
//       height: canvas.outerHeight(),
//       model: graph,
//       gridSize: 20,
//       defaultRouter: { name: 'metro' },
//       clickThreshold: 1
//     });
    
//     cells[0] = new joint.shapes.devs.Model({
//       type: 'devs.Model',
//       position: {x: 20, y: 20},
//       attrs: {
//         '.body': {
//           width: '140',
//           height: '60'
//         },
//         '.label': {
//           text: 'blok 1',
//         },
//         '.element-node' : {
//           'data-color': 'pink'
//         }
//       },
//       inPorts: ['center']
//     });
//     cells[0].translate(140, 100);
//     cells[1] = cells[0].clone();
//     cells[1].translate(300, 60);
//     cells[1].attr('.label/text', 'blok 2');
//     graph.addCells(cells);
    
//     var link = new joint.dia.Link({
//       source: {
//         id: cells[0].id,
//         port: 'center'
//       },
//       target: {
//         id: cells[1].id,
//         port: 'center'
//       }
//     });
//     graph.addCells([link]);
    
//     function addCell(){
//       var color = addColor.val();
//       var number = cells.length;
//       cells[number] = cells[0].clone();
//       cells[number].translate(-140, -100);
//       cells[number].attr('.element-node/data-color', color);
//       cells[number].attr('.label/text', 'blok '+cells.length);
//       graph.addCells(cells);
//     }
    
//     $('#addCell').on('click', addCell);
    
//     $(filter).on('change', function(e){
//       canvas.attr('data-filter', e.target.value);
//     });
    
//     var svgZoom = svgPanZoom('#canvas svg', {
//       center: false,
//       zoomEnabled: true,
//       panEnabled: true,
//       controlIconsEnabled: true,
//       fit: false,
//       minZoom: 0.5,
//       maxZoom:2,
//       zoomScaleSensitivity: 0.5
//     });
    
//     (function(){
//       paper.on('cell:pointerdown', function(){
//         svgZoom.disablePan();
//       });
//       paper.on('cell:pointerup', function(){
//         svgZoom.enablePan();
//       });
      
//       paper.on('cell:pointerclick', function(e){
//         message.addClass('visible');
//         message.html(e.el.textContent+' clicked');
//       setTimeout(function(){  message.removeClass('visible');
//                            }, 1000);
//       });
//     })();





// #include <WiFi.h>
// #include <PubSubClient.h>
// #include <stdlib.h>

// // Thông tin Wifi
// const char* ssid ="nhap ten wifi cua ban";
// const char* password ="mat khau wifi";
// const char* mqtt_server = "ten mqtt server cua ban";
// const char* mqtt_user = "username";
// const char* mqtt_pass = "password";
// const int mqtt_port = so port;
// const char* mqtt_client_name = "iothutech"; // Client connections cant have the same connection name

// #define BUILTIN_LED 21

// // ClientID 
// const char* clientID = "khanhneyiothutechzs";

// //Thiết lập output xuất(public) và nhận(subscibe) dữ liệu với MQTT
// const char* outTopic = "public/esp/outputkhanhney";
// const char* inTopic = "public/esp/inputkhanhney";
// const char* finalTopic = "public/esp/khanhney";

// unsigned long previousMillis = 0;        // will store last temp was read
// const long interval = 2000;              // interval at which to read sensor
// const int threshold = 600;
// // thiết lập ngưỡng do chúng ta tự setup
// WiFiClient espClient;
// PubSubClient client(espClient);
// char msg[50];
// int count = 0;

// // Hàm kết nối Wifi
// void setup_wifi() {
//   delay(10);
//   // We start by connecting to a WiFi network
//   Serial.println();
//   Serial.print("Connecting to ");
//   Serial.println(ssid);
//   WiFi.begin(ssid, password);
//   while (WiFi.status() != WL_CONNECTED) {
//     delay(500);
//     Serial.print(".");
//   }
//   Serial.println("");
//   Serial.println("WiFi connected");
//   Serial.println("IP address: ");
//   Serial.println(WiFi.localIP());
// //  pinMode(D2, OUTPUT);
//   pinMode(BUILTIN_LED, OUTPUT);
// //  khai báo sử dụng D2 làm gốc test
// }
// // Hàm call back được gọi khi nhận được thông tin từ subcribing topic
// void callback(char* topic, byte* payload, unsigned int length) {
//   // xử lý dữ liệu nhận được
//   /*
//    * convert string to int giá trị cường độ sáng
//    * if/else điều khiển bật tắt relay dựa trên ngưỡng
//   */
//   Serial.println("HELLO KHANHNEY_TESTY/");
//   char* message = (char*) payload;
//   int value = atoi(message);
// //  hàm convert string sang number thôi ae
//   Serial.println(value);
//   if (value > threshold) {
//       digitalWrite(BUILTIN_LED, HIGH);
//       Serial.println("HIGH");
//       Serial.println(message);
//   } else {
//     digitalWrite(BUILTIN_LED, LOW); 
//     Serial.println("LOW");
//     Serial.println(message);
//   }
// }
// // Reconnect đến MQTT Broker
// void reconnect() {
//   // Loop until we're reconnected
//   while (!client.connected()) {
//     Serial.print("Attempting MQTT connection...");
//     // Attempt to connect
//     if (client.connect(mqtt_client_name, mqtt_user, mqtt_pass)) {
//       Serial.println("connected");
//       // Once connected, publish an announcement...
//       client.publish(outTopic, clientID);
//       // ... and resubscribe
//       client.subscribe(inTopic);
//     }
//     else {
//       Serial.print("failed, rc=");
//       Serial.print(client.state());
//       Serial.println(" try again in 5 seconds");
//       // Wait 5 seconds before retrying
//       delay(5000);
//     }
//   }
// }
// void setup() {
//   Serial.begin(115200);
//   setup_wifi();
//   client.setServer(mqtt_server, mqtt_port);
//   client.setCallback(callback);
//   while (!client.connected()) {
//     Serial.println("Connecting to MQTT...");
//     if (client.connect(mqtt_client_name, mqtt_user, mqtt_pass)) {
//       Serial.println("connected");  
//       client.subscribe(inTopic);   
//     } else {
//       Serial.print("failed with state ");
//       Serial.print(client.state());
//       delay(2000);
//     }
//   }
// }
// void loop() {
//   if (!client.connected()) {
//     reconnect();
//   }
//   client.loop();
// }