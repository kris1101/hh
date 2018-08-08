import React, { Component } from 'react';

import vm_routes from './vm.js';
import machine_routes from './machine.js';
import daas_routes from './daas';
import docker_routes from './docker';
import monitor_routes from './monitor';
import setting_routes from './setting';
import storage_routes from './storage';
import ticket_routes from './ticket';


const routes=[
    vm_routes,
    machine_routes,
    daas_routes,
    docker_routes,
    monitor_routes,
    setting_routes,
    storage_routes,
    ticket_routes
    ]
export default routes;
