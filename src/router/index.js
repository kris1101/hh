import vm_routes from './vm.js';
import machine_routes from './machine.js';
import daas_routes from './daas';
import docker_routes from './docker';
import monitor_routes from './monitor';
import setting_routes from './setting';
import storage_routes from './storage';
// import ticket_routes from './ticket';

var routes=[];
vm_routes.map((item) => routes.push(item));
daas_routes.map((item) => routes.push(item));
machine_routes.map((item) => routes.push(item));
docker_routes.map((item) => routes.push(item));
monitor_routes.map((item) => routes.push(item));
setting_routes.map((item) => routes.push(item));
storage_routes.map((item) => routes.push(item));
// ticket_routes.map((item) => routes.push(item));
export default routes;
