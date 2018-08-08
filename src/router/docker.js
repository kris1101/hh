import React, { Component } from 'react';

import Docker_server from '../components/docker/server/serverlist'

const docker_routes=
    {
        exact: true,
        path: '/docker/server',
        component: Docker_server,
    }
export default docker_routes;
