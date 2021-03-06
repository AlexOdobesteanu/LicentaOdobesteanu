import React, { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart, Doughnut } from 'react-chartjs-2'
import { Bar, Line } from 'react-chartjs-2'
import { } from "materialize-css"
import { Parallax, Background } from 'react-parallax';
import { HashLoader } from 'react-spinners';
import M from 'materialize-css'
import { Collapsible, CollapsibleItem, Icon, TextInput, Button, Modal, Checkbox } from 'react-materialize'

import "../../App.css"
import { internal_resolveProps } from '@mui/utils';


function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }

        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

function useInterval2(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }

        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}


const ContainerData = () => {
    const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "whitesmoke" };
    const location = useLocation();
    const idContainer = location.state.idContainer
    const domainName = location.state.domainName
    const nickname = location.state.nickname
    const [FSChanges, setFSChanges] = useState([])
    const [Processes, setProcesses] = useState([])
    const [loadingFS, setLoadingFS] = useState(true)



    const [loading, setLoading] = useState(false)
    const [dates, setDates] = useState([])
    const [memory_doughnut_data, set_memory_doughnut_data] = useState([])


    const [onlineCPU, setOnlineCPU] = useState([])
    const [userMode, setUserMode] = useState([])
    const [kernelMode, setKernelMode] = useState([])

    const [networks, setNetworks] = useState([])
    const [rxBytes, setRxBytes] = useState([])
    const [txBytes, setTxBytes] = useState([])
    const [rate, setRate] = useState([])
    const [rxPackets, setRxPackets] = useState([])
    const [txPackets, setTxPackets] = useState([])
    const [rxDropped, setRxDropped] = useState([])
    const [txDropped, setTxDropped] = useState([])
    const [rxErrors, setRxErrors] = useState([])
    const [txErrors, setTxErrors] = useState([])

    const [Ports, setPorts] = useState([])

    const [cpuPercent, setCpuPercent] = useState([])
    const [toggle, setToggle] = useState(false)
    const [fullData, setFullData] = useState([])
    const [memoryPerc, setMemoryPerc] = useState([])
    const [memoryUsage, setMemoryUsage] = useState([])
    const [cache, setCache] = useState([])

    const [delay, setDelay] = useState(4000);
    const [isRunning, setIsRunning] = useState(false);
    const [isRunning2, setIsRunning2] = useState(true);
    const [graph, setGraph] = useState(false);
    const [MyData, setData] = useState([])


    const getFSChanges = () => {

    }




    const renderNetworks = () => {
        if (networks.length != 0) {
            return (
                <div class="card-content" style={{ width: '33%', textAlign: 'left', marginLeft: '100px', display: 'flex', gap: '50px' }}>
                    {
                        networks.map(item => {
                            return (

                                <div>
                                    <div>
                                        <p id='white-text-large'>Network Name: <b id='blue-text'>{item}</b></p>
                                        <p id='white-text-large'>MAC Address: <b id='blue-text'>{MyData.NetworkSettings.Networks[item].MacAddress}</b></p>
                                    </div>

                                    <div>
                                        <p id='white-text-large'>IP Address: <b id='blue-text'>{MyData.NetworkSettings.Networks[item].IPAddress}</b></p>
                                        <p id='white-text-large'>IP Prefix Length: <b id='blue-text'>{MyData.NetworkSettings.Networks[item].IPPrefixLen}</b></p>
                                        <p id='white-text-large'>Gateway: <b id='blue-text'>{MyData.NetworkSettings.Networks[item].Gateway}</b></p>
                                    </div>

                                    <div>
                                        <p id='white-text-large'>IPv6 Address: <b id='blue-text'>{MyData.NetworkSettings.Networks[item].GlobalIPv6Address}</b></p>
                                        <p id='white-text-large'>IPv6 Prefix Length: <b id='blue-text'>{MyData.NetworkSettings.Networks[item].GlobalIPv6PrefixLen}</b></p>
                                        <p id='white-text-large'>IPv6 Gateway: <b id='blue-text'>{MyData.NetworkSettings.Networks[item].IPv6Gateway}</b></p>
                                        <br></br>
                                    </div>
                                </div>

                            )
                        })

                    }
                </div >
            )
        }
    }
    const renderPorts = () => {
        if (Ports.length != 0) {
            return (
                <div class="card-content" style={{ width: '33%', textAlign: 'left', marginLeft: '150px', display: 'flex', gap: '50px' }}>
                    {
                        Ports.map(item => {
                            if (MyData.NetworkSettings.Ports[item] != null) {
                                return (
                                    <div>
                                        <p id='white-text-large'>Port: <b id='blue-text'>{item}</b></p>
                                        {
                                            MyData.NetworkSettings.Ports[item].map(item2 => {
                                                return (
                                                    <div>
                                                        <p id='white-text-large'>Host IP Address: <b id='blue-text'>{item2['HostIp']}</b></p>
                                                        <p id='white-text-large'>Host Port: <b id='blue-text'>{item2['HostPort']}</b></p>
                                                        <br></br>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            }
                            else {
                                return (
                                    <div>
                                        <p id='white-text-large'>Port: <b id='blue-text'>{item}</b></p>
                                        <p id='white-text-large'>Host IP Address: <b id='blue-text'>null</b></p>
                                        <p id='white-text-large'>Host Port: <b id='blue-text'>null</b></p>
                                        <br></br>
                                    </div>
                                )
                            }
                        })
                    }
                </div >
            )
        }
    }


    const toggler = () => {
        if (toggle == false) {
            fetch("/automonitor", {
                method: "post",
                headers:
                {
                    "Authorization": "Bearer " + localStorage.getItem("jwt"),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    domainName: domainName,
                    nickname: nickname,
                    idContainer: idContainer
                })
            }).then(res => res.json())
                .then(result => {
                    console.log(result)
                })

        }
        toggle ? setToggle(false) : setToggle(true)
    }

    const showGraph = () => {
        setIsRunning(true)
        setGraph(true)
        M.toast({ html: "Dashboards showing", classes: 'rounded green' })
    }
    const showLess = () => {
        setIsRunning(false)
        setGraph(false)
    }

    useInterval2(() => {
        fetch('/GetProcesses',
            {
                method: "post",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("jwt"),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        idContainer: idContainer,
                        domainName: domainName,
                        nickname: nickname
                    }
                )
            }
        ).then(res => res.json())
            .then(result => {
                if (result != null) {
                    setProcesses(result.data)
                }
                // console.log(result.data)
            })

    }, isRunning2 ? delay : null);

    useInterval(() => {
        fetch('/GetProcesses',
            {
                method: "post",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("jwt"),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        idContainer: idContainer,
                        domainName: domainName,
                        nickname: nickname
                    }
                )
            }
        ).then(res => res.json())
            .then(result => {
                if (result != null) {
                    setProcesses(result.data)
                }
                console.log(result)
                // console.log(result.data)
            })


        fetch('/FSChanges',
            {
                method: "post",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("jwt"),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        idContainer: idContainer,
                        domainName: domainName,
                        nickname: nickname
                    }
                )
            }
        ).then(res => res.json())
            .then(result => {
                console.log(result.changes)
                setFSChanges(result.changes)
            })

        fetch("/containersstats", {
            method: "post",
            headers:
            {
                "Authorization": "Bearer " + localStorage.getItem("jwt"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                domainName: domainName,
                nickname: nickname,
                idContainer: idContainer
            })
        }).then(res => res.json())
            .then(result => {
                // console.log((parseFloat(result.data.memory_stats['usage']) / parseFloat(result.data.memory_stats['limit'])) * 100)
                setDates(dates => [...dates, new Date().toLocaleString()])
                if (dates.length >= 20) {
                    setDates(dates.slice(10, dates.length))
                }


                setMemoryPerc(memoryPerc => [...memoryPerc, ((parseFloat(result.data.memory_stats['usage']) / parseFloat(result.data.memory_stats['limit'])) * 100).toFixed(3)])
                if (memoryPerc.length >= 20) {
                    setMemoryPerc(memoryPerc.slice(10, memoryPerc.length))
                }


                setMemoryUsage(memoryUsage => [...memoryUsage, (parseFloat(result.data.memory_stats['usage']) / 1000000).toFixed(2)])
                if (memoryUsage.length >= 20) {
                    setMemoryUsage(memoryUsage.slice(10, memoryUsage.length))
                }


                setFullData((parseFloat(result.data.memory_stats['limit']) / 1000000000).toFixed(2))




                setCache(cache => [...cache, (parseFloat(result.data.memory_stats.stats['total_cache'] / 1000000)).toFixed(3)])
                if (cache.length >= 20) {
                    setCache(cache.slice(10, cache.length))
                }



                let cpuDelta = parseFloat(result.data.cpu_stats.cpu_usage['total_usage']) - parseFloat(result.data.precpu_stats.cpu_usage['total_usage'])
                let systemDelta = parseFloat(result.data.cpu_stats.system_cpu_usage) - parseFloat(result.data.precpu_stats.system_cpu_usage)
                setOnlineCPU(result.data.cpu_stats['online_cpus'])


                setCpuPercent(cpuPercent => [...cpuPercent, parseFloat(parseFloat((cpuDelta / systemDelta) * result.data.cpu_stats['online_cpus'] * 100)).toFixed(3)])
                if (cpuPercent.length >= 20) {
                    setCpuPercent(cpuPercent.slice(10, cpuPercent.length))
                }


                setUserMode(userMode => [...userMode, parseFloat(parseFloat((parseFloat(result.data.cpu_stats.cpu_usage['usage_in_usermode']) - parseFloat(result.data.precpu_stats.cpu_usage['usage_in_usermode'])) / systemDelta) * result.data.cpu_stats['online_cpus'] * 100).toFixed(3)])
                if (userMode.length >= 20) {
                    setUserMode(userMode.slice(10, userMode.length))
                }


                setKernelMode(kernelMode => [...kernelMode, parseFloat(parseFloat((parseFloat(result.data.cpu_stats.cpu_usage['usage_in_kernelmode']) - parseFloat(result.data.precpu_stats.cpu_usage['usage_in_kernelmode'])) / systemDelta) * result.data.cpu_stats['online_cpus'] * 100).toFixed(3)])
                if (kernelMode.length >= 20) {
                    setKernelMode(kernelMode.slice(10, kernelMode.length))
                }

                //MEMORY DOUGHNUT




                setRxBytes(rxBytes => [...rxBytes, parseFloat(parseFloat(result.data.networks.eth0['rx_bytes']) / 1000000).toFixed(3)])
                if (rxBytes.length >= 20) {
                    setRxBytes(rxBytes.slice(10, rxBytes.length))
                }


                setTxBytes(txBytes => [...txBytes, parseFloat(parseFloat(result.data.networks.eth0['tx_bytes']) / 1000000).toFixed(3)])
                if (txBytes.length >= 20) {
                    setTxBytes(txBytes.slice(10, txBytes.length))
                }

                setRate(rate => [...rate, parseFloat(parseFloat(result.data.networks.eth0['tx_bytes']) / parseFloat(result.data.networks.eth0['rx_bytes'])).toFixed(3)])
                if (rate.length >= 20) {
                    setRate(rate.slice(10, rate.length))
                }

                setRxPackets(rxPackets => [...rxPackets, parseFloat(result.data.networks.eth0['rx_packets'])])
                if (rxPackets.length >= 20) {
                    setRxPackets(rxPackets.slice(10, rxPackets.length))
                }

                setTxPackets(txPackets => [...txPackets, parseFloat(result.data.networks.eth0['tx_packets'])])
                if (txPackets.length >= 20) {
                    setTxPackets(txPackets.slice(10, txPackets.length))
                }

                setRxDropped(rxDropped => [...rxDropped, parseFloat(result.data.networks.eth0['rx_dropped'])])
                if (rxDropped.length >= 20) {
                    setRxDropped(rxDropped.slice(10, rxDropped.length))
                }

                setTxDropped(txDropped => [...txDropped, parseFloat(result.data.networks.eth0['tx_dropped'])])
                if (txDropped.length >= 20) {
                    setTxDropped(txDropped.slice(10, txDropped.length))
                }

                setRxErrors(rxErrors => [...rxErrors, parseFloat(result.data.networks.eth0['rx_errors'])])
                if (rxErrors.length >= 20) {
                    setRxErrors(rxErrors.slice(10, rxErrors.length))
                }


                setTxErrors(txErrors => [...txErrors, parseFloat(result.data.networks.eth0['tx_errors'])])
                if (txErrors.length >= 20) {
                    setTxErrors(txErrors.slice(10, txErrors.length))
                }

                // setRxBytes(rxBytes => [...rxBytes, parseFloat(result.data.networks.networks[0]['rx_bytes'])])



                // console.log(fullData)
                // console.log(toggle)
                // console.log(cpuPercent)
                // console.log(cpuDelta - userMode - kernelMode)
                // console.log(result.data)
                // console.log(rxBytes)
                console.log(result.data)

            })
    }, isRunning ? delay : null);

    useEffect(() => {
        fetch('/GetProcesses',
            {
                method: "post",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("jwt"),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        idContainer: idContainer,
                        domainName: domainName,
                        nickname: nickname
                    }
                )
            }
        ).then(res => res.json())
            .then(result => {
                console.log(result)
                if (result != null) {
                    setProcesses(result.data)
                }
                // console.log(result.data)
            })

        fetch('/FSChanges',
            {
                method: "post",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("jwt"),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        idContainer: idContainer,
                        domainName: domainName,
                        nickname: nickname
                    }
                )
            }
        ).then(res => res.json())
            .then(result => {
                console.log('bbb')

                setFSChanges(result.changes)
            })

        fetch("/containersfullinfo", {
            method: "post",
            headers:
            {
                "Authorization": "Bearer " + localStorage.getItem("jwt"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                domainName: domainName,
                nickname: nickname,
                idContainer: idContainer
            })
        }).then(res => res.json())
            .then(result => {
                setData(result.data)
                console.log(result.data)
                setNetworks(Object.keys(result.data.NetworkSettings.Networks))
                setLoading(true)
                setPorts(Object.keys(result.data.NetworkSettings.Ports))

            })


    }, [])

    return (
        <div>
            {
                isRunning === false && graph === false ?
                    (<div>
                        {
                            loading ? (<div class="col s12 m7" style={{
                                margin: "40px auto",
                                maxWidth: "1600px",
                            }}>
                                {
                                    MyData.State['Status'] === 'running' ? (<div class="card horizontal" >

                                        <div>
                                            <div id='flex' style={{ width: '100%', maxWidth: '100%' }}>
                                                <div class="card-content" style={{ width: '33%', textAlign: 'left', marginLeft: '150px' }}>
                                                    <p id='white-text-large'>Type: <b id='blue-text'>Container</b></p>
                                                    <p id='white-text-large'>Name: <b id='blue-text'>{MyData.Name}</b></p>
                                                    <br></br>
                                                    <p id='white-text-large'>Created At: <b id='blue-text'>{new Date(MyData.Created).toUTCString([], { hour: '2-digit', minute: '2-digit' })}</b></p>
                                                    <p id='white-text-large'>Started At: <b id='blue-text'>{new Date(MyData.State['StartedAt']).toUTCString([], { hour: '2-digit', minute: '2-digit' })}</b></p>
                                                    <p id='white-text-large'>Finished At: <b id='blue-text'>{new Date(MyData.State['FinishedAt']).toUTCString([], { hour: '2-digit', minute: '2-digit' })}</b></p>
                                                    <br></br>
                                                    <p id='white-text-large'>PID: <b id='blue-text'>{MyData.State['Pid']}</b></p>
                                                    <p id='white-text-large'>Platform: <b id='blue-text'>{MyData.Platform}</b></p>
                                                    <p id='white-text-large'>Status: <b id='blue-text'>{MyData.State['Status']}</b></p>

                                                </div>

                                                {renderNetworks()}
                                                {renderPorts()}


                                            </div>

                                        </div>
                                    </div>) : (
                                        <div class="card horizontal" >
                                            <div id='flex' style={{ width: '100%' }}>
                                                <div class="card-content" style={{ width: '33%', textAlign: 'left', marginLeft: '150px' }}>
                                                    <p id='white-text-large'>Type: <b id='blue-text'>Container</b></p>
                                                    <p id='white-text-large'>Name: <b style={{ color: 'red' }}>{MyData.Name}</b></p>
                                                    <br></br>
                                                    <p id='white-text-large'>Created At: <b id='blue-text'>{new Date(MyData.Created).toUTCString([], { hour: '2-digit', minute: '2-digit' })}</b></p>
                                                    <p id='white-text-large'>Started At: <b id='blue-text'>{new Date(MyData.State['StartedAt']).toUTCString([], { hour: '2-digit', minute: '2-digit' })}</b></p>
                                                    <p id='white-text-large'>Finished At: <b id='blue-text'>{new Date(MyData.State['FinishedAt']).toUTCString([], { hour: '2-digit', minute: '2-digit' })}</b></p>
                                                    <br></br>
                                                    <p id='white-text-large'>PID: <b id='blue-text'>{MyData.State['Pid']}</b></p>
                                                    <p id='white-text-large'>Platform: <b id='blue-text'>{MyData.Platform}</b></p>
                                                    <p id='white-text-large'>Status: <b style={{ color: 'red' }}>{MyData.State['Status']}</b></p>
                                                </div>
                                                {renderNetworks()}
                                                {renderPorts()}
                                            </div>
                                        </div>)
                                }
                                <div class="col s12 m7" style={{
                                    margin: "50px auto",
                                    maxWidth: "900px",
                                    textAlign: "center"
                                }}>
                                    {
                                        MyData.State['Status'] === 'running' ? (
                                            <div>
                                                <button className="btn waves-effect waves-light" id='blue-button' onClick={() => showGraph()}>
                                                    View resource usage
                                                </button>

                                                <Modal
                                                    actions={[
                                                        <div id='modal-bottom'>
                                                            <Button flat modal="close" node="button" waves="green" id='red-button'>Close</Button>
                                                        </div>
                                                    ]}
                                                    bottomSheet={false}
                                                    fixedFooter={true}
                                                    header="Current Processes"
                                                    id="Modal-10"
                                                    open={false}
                                                    options={{
                                                        dismissible: true,
                                                        endingTop: '10%',
                                                        inDuration: 250,
                                                        onCloseEnd: null,
                                                        onCloseStart: null,
                                                        onOpenEnd: null,
                                                        onOpenStart: null,
                                                        opacity: 0.5,
                                                        outDuration: 250,
                                                        preventScrolling: false,
                                                        startingTop: '4%'
                                                    }}
                                                    trigger={<button style={{ marginLeft: '20px' }} className="btn waves-effect waves-light" id='blue-button'>
                                                        View processes
                                                    </button>}
                                                >
                                                    {/* <b id='white-text' style={{ fontSize: '20px' }}>Total Processes: <b id='blue-text'> {Processes.Processes[0].length}</b></b> */}
                                                    <div>
                                                        <div>

                                                            <div>
                                                                <table style={{ border: '2px solid white' }}>
                                                                    <tr>
                                                                        <th>PID</th>
                                                                        <th>TTY</th>
                                                                        <th>TIME</th>
                                                                        <th>CMD</th>
                                                                    </tr>

                                                                    {
                                                                        Processes.Processes?.map(item => {
                                                                            return (
                                                                                <tr style={{ border: '2px solid white' }}>

                                                                                    <td id='blue-text'><b>{item["0"]}</b></td>
                                                                                    <td id='blue-text'><b>{item["1"]}</b></td>
                                                                                    <td id='blue-text'><b>{item["2"]}</b></td>
                                                                                    <td id='blue-text'><b>{item["3"]}</b></td>

                                                                                </tr>
                                                                            )
                                                                        })
                                                                    }
                                                                </table>

                                                            </div>
                                                        </div>
                                                    </div>

                                                </Modal>

                                                <Modal
                                                    actions={[
                                                        <div id='modal-bottom'>
                                                            <Button flat modal="close" node="button" waves="green" id='red-button'>Close</Button>
                                                        </div>
                                                    ]}
                                                    bottomSheet={false}
                                                    fixedFooter={true}
                                                    header="Filesystem changes"
                                                    id="Modal-10"
                                                    open={false}
                                                    options={{
                                                        dismissible: true,
                                                        endingTop: '10%',
                                                        inDuration: 250,
                                                        onCloseEnd: null,
                                                        onCloseStart: null,
                                                        onOpenEnd: null,
                                                        onOpenStart: null,
                                                        opacity: 0.5,
                                                        outDuration: 250,
                                                        preventScrolling: false,
                                                        startingTop: '4%'
                                                    }}
                                                    trigger={<button style={{ marginLeft: '20px' }} className="btn waves-effect waves-light" id='blue-button'>
                                                        View filesystem changes
                                                    </button>}
                                                >
                                                    {
                                                        FSChanges["type"] != "Buffer" ?

                                                            <>
                                                                <b id='white-text' style={{ fontSize: '20px' }}>Total Changes: <b id='blue-text'> {FSChanges.length}</b></b>

                                                                {
                                                                    FSChanges.map(item => {

                                                                        return (
                                                                            <div >

                                                                                <div class="card horizontal">
                                                                                    <div class="card-stacked">
                                                                                        <div class="card-content">

                                                                                            <p id='white-text'>File: <b style={{ color: 'rgb(32,151,207)' }}> {item.Path}</b></p>
                                                                                            <>
                                                                                                {
                                                                                                    item.Kind == 0 ? <p id='white-text'>Type: <b style={{ color: 'rgb(32,151,207)' }}> Modified</b></p> :
                                                                                                        <>
                                                                                                            {
                                                                                                                item.Kind == 1 ? <p id='white-text'>Type: <b style={{ color: 'rgb(32,151,207)' }}> Added</b></p> :
                                                                                                                    <>
                                                                                                                        <p id='white-text'>Type: <b style={{ color: 'rgb(32,151,207)' }}> Deleted</b></p>
                                                                                                                    </>
                                                                                                            }
                                                                                                        </>
                                                                                                }
                                                                                            </>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )

                                                                    })

                                                                }
                                                            </> : <b id='White-text'>No Filesystem changes</b>
                                                    }



                                                </Modal>

                                            </div>) : (<div></div>)
                                    }
                                </div>

                            </div>)
                                : (<div style={style}><HashLoader color='white' speedMultiplier={2}></HashLoader></div>)
                        }

                    </div >)
                    : (<div style={{
                        background: "rgb(40,44,52)",
                        minHeight: '570vh',
                        overflow: 'auto'
                    }}>
                        {
                            loading ? (<div class="col s12 m7" style={{
                                margin: "40px auto",
                                maxWidth: "1300px",
                            }}>
                                {
                                    MyData.State['Status'] === 'running' ? (<div class="card horizontal" >
                                        <div id='flex' style={{ width: '100%' }}>
                                            <div class="card-content" style={{ width: '33%', textAlign: 'left', marginLeft: '150px' }}>
                                                <p id='white-text-large'>Type: <b id='blue-text'>Container</b></p>
                                                <p id='white-text-large'>Name: <b id='blue-text'>{MyData.Name}</b></p>
                                                <br></br>
                                                <p id='white-text-large'>Created At: <b id='blue-text'>{new Date(MyData.Created).toUTCString([], { hour: '2-digit', minute: '2-digit' })}</b></p>
                                                <p id='white-text-large'>Started At: <b id='blue-text'>{new Date(MyData.State['StartedAt']).toUTCString([], { hour: '2-digit', minute: '2-digit' })}</b></p>
                                                <p id='white-text-large'>Finished At: <b id='blue-text'>{new Date(MyData.State['FinishedAt']).toUTCString([], { hour: '2-digit', minute: '2-digit' })}</b></p>
                                                <br></br>
                                                <p id='white-text-large'>PID: <b id='blue-text'>{MyData.State['Pid']}</b></p>
                                                <p id='white-text-large'>Platform: <b id='blue-text'>{MyData.Platform}</b></p>
                                                <p id='white-text-large'>Status: <b id='blue-text'>{MyData.State['Status']}</b></p>
                                            </div>
                                            {renderNetworks()}
                                            {renderPorts()}
                                        </div>
                                    </div>) : (
                                        <div class="card horizontal" >
                                            <div id='flex' style={{ width: '100%' }}>
                                                <div class="card-content" style={{ width: '33%', textAlign: 'left', marginLeft: '150px' }}>
                                                    <p id='white-text-large'>Type: <b id='blue-text'>Container</b></p>
                                                    <p id='white-text-large'>Name: <b style={{ color: 'red' }}>{MyData.Name}</b></p>
                                                    <br></br>
                                                    <p id='white-text-large'>Created At: <b id='blue-text'>{new Date(MyData.Created).toUTCString([], { hour: '2-digit', minute: '2-digit' })}</b></p>
                                                    <p id='white-text-large'>Started At: <b id='blue-text'>{new Date(MyData.State['StartedAt']).toUTCString([], { hour: '2-digit', minute: '2-digit' })}</b></p>
                                                    <p id='white-text-large'>Finished At: <b id='blue-text'>{new Date(MyData.State['FinishedAt']).toUTCString([], { hour: '2-digit', minute: '2-digit' })}</b></p>
                                                    <br></br>
                                                    <p id='white-text-large'>PID: <b id='blue-text'>{MyData.State['Pid']}</b></p>
                                                    <p id='white-text-large'>Platform: <b id='blue-text'>{MyData.Platform}</b></p>
                                                    <p id='white-text-large'>Status: <b style={{ color: 'red' }}>{MyData.State['Status']}</b></p>
                                                </div>
                                                {renderNetworks()}
                                                {renderPorts()}
                                            </div>
                                        </div>)
                                }

                                <div class="col s12 m7" style={{
                                    margin: "50px auto",
                                    maxWidth: "900px",
                                    textAlign: "center"
                                }}>
                                    {
                                        MyData.State['Status'] === 'running' ? (
                                            <div>
                                                <button className="btn waves-effect waves-light" id='blue-button' onClick={() => showGraph()}>
                                                    View resource usage
                                                </button>
                                                <Modal
                                                    actions={[
                                                        <div id='modal-bottom'>
                                                            <Button flat modal="close" node="button" waves="green" id='red-button'>Close</Button>
                                                        </div>
                                                    ]}
                                                    bottomSheet={false}
                                                    fixedFooter={true}
                                                    header="Current Processes"
                                                    id="Modal-10"
                                                    open={false}
                                                    options={{
                                                        dismissible: true,
                                                        endingTop: '10%',
                                                        inDuration: 250,
                                                        onCloseEnd: null,
                                                        onCloseStart: null,
                                                        onOpenEnd: null,
                                                        onOpenStart: null,
                                                        opacity: 0.5,
                                                        outDuration: 250,
                                                        preventScrolling: false,
                                                        startingTop: '4%'
                                                    }}
                                                    trigger={<button style={{ marginLeft: '20px' }} className="btn waves-effect waves-light" id='blue-button'>
                                                        View processes
                                                    </button>}
                                                >
                                                    {/* <b id='white-text' style={{ fontSize: '20px' }}>Total Processes: <b id='blue-text'> {Processes.Processes[0].length}</b></b> */}
                                                    <div>
                                                        <div>

                                                            <div>
                                                                <table style={{ border: '2px solid white' }}>
                                                                    <tr>
                                                                        <th>PID</th>
                                                                        <th>TTY</th>
                                                                        <th>TIME</th>
                                                                        <th>CMD</th>
                                                                    </tr>

                                                                    {
                                                                        Processes.Processes?.map(item => {
                                                                            return (
                                                                                <tr style={{ border: '2px solid white' }}>

                                                                                    <td id='blue-text'><b>{item["0"]}</b></td>
                                                                                    <td id='blue-text'><b>{item["1"]}</b></td>
                                                                                    <td id='blue-text'><b>{item["2"]}</b></td>
                                                                                    <td id='blue-text'><b>{item["3"]}</b></td>

                                                                                </tr>
                                                                            )
                                                                        })
                                                                    }
                                                                </table>

                                                            </div>
                                                        </div>
                                                    </div>

                                                </Modal>
                                                <Modal
                                                    actions={[
                                                        <div id='modal-bottom'>
                                                            <Button flat modal="close" node="button" waves="green" id='red-button'>Close</Button>
                                                        </div>
                                                    ]}
                                                    bottomSheet={false}
                                                    fixedFooter={true}
                                                    header="Filesystem changes"
                                                    id="Modal-10"
                                                    open={false}
                                                    options={{
                                                        dismissible: true,
                                                        endingTop: '10%',
                                                        inDuration: 250,
                                                        onCloseEnd: null,
                                                        onCloseStart: null,
                                                        onOpenEnd: null,
                                                        onOpenStart: null,
                                                        opacity: 0.5,
                                                        outDuration: 250,
                                                        preventScrolling: false,
                                                        startingTop: '4%'
                                                    }}
                                                    trigger={<button style={{ marginLeft: '20px' }} className="btn waves-effect waves-light" id='blue-button'>
                                                        View filesystem changes
                                                    </button>}
                                                >
                                                    {
                                                        FSChanges["type"] != "Buffer" ?

                                                            <>
                                                                <b id='white-text' style={{ fontSize: '20px' }}>Total Changes: <b id='blue-text'> {FSChanges.length}</b></b>

                                                                {
                                                                    FSChanges.map(item => {

                                                                        return (
                                                                            <div>
                                                                                <div class="card horizontal">
                                                                                    <div class="card-stacked">
                                                                                        <div class="card-content">

                                                                                            <p id='white-text'>File: <b style={{ color: 'rgb(32,151,207)' }}> {item.Path}</b></p>
                                                                                            <>
                                                                                                {
                                                                                                    item.Kind == 0 ? <p id='white-text'>Type: <b style={{ color: 'rgb(32,151,207)' }}> Modified</b></p> :
                                                                                                        <>
                                                                                                            {
                                                                                                                item.Kind == 1 ? <p id='white-text'>Type: <b style={{ color: 'rgb(32,151,207)' }}> Added</b></p> :
                                                                                                                    <>
                                                                                                                        <p id='white-text'>Type: <b style={{ color: 'rgb(32,151,207)' }}> Deleted</b></p>
                                                                                                                    </>
                                                                                                            }
                                                                                                        </>
                                                                                                }
                                                                                            </>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )

                                                                    })

                                                                }
                                                            </> : <b id='White-text'>No Filesystem changes</b>
                                                    }



                                                </Modal>
                                            </div>) : (<div></div>)
                                    }


                                    {
                                        graph ? (
                                            <div>
                                                <br></br>
                                                <button className="btn waves-effect waves-light" id='blue-button' onClick={() => showLess()}>
                                                    View less
                                                </button>
                                                {/* <div class="card horizontal" style={{ margin: '50px' }} >
                                                <div id='flex' style={{ width: '100%' }}>
                                                    <div class="card-content" id='to-center'>
                                                        <p id='white-text-large'>MEM Usage %: <b id='blue-text'>{memoryPerc[memoryPerc.length - 1]} %</b></p>
                                                        <p id='white-text-large'>MEM Used: <b id='blue-text'>{memoryUsage[memoryUsage.length - 1]} MiB</b></p>
                                                        <p id='white-text-large'>Memory Limit: <b id='blue-text'>{fullData} GiB</b></p>
                                                        <p id='white-text-large'>Online CPUs: <b id='blue-text'>{onlineCPU}</b></p>
                                                        <p id='white-text-large'>Cache: <b id='blue-text'>{cache[cache.length - 1]} MiB</b></p>
            
                                                    </div>
                                                </div>
                                            </div> */}

                                            </div>) : (<div></div>)

                                    }



                                    <div style={{
                                        margin: "900px auto",
                                        height: 800,
                                        width: 800,
                                        position: 'absolute', left: '25%', top: '80%',
                                        transform: 'translate(-50%, -50%)'
                                    }}>
                                        {
                                            graph ?
                                                (<div>
                                                    <div style={{ display: 'flex', gap: '170px' }}>

                                                        <Line data={{
                                                            labels: dates.slice(-10),
                                                            datasets: [{
                                                                label: 'MEM Usage %',
                                                                fill: true,
                                                                backgroundColor: 'rgba(255, 205, 86, 0.2)',
                                                                pointBorderColor: 'white',
                                                                pointBorderWidth: 3,
                                                                pointRadius: 3,
                                                                tension: 0.4,
                                                                borderColor: 'rgb(255, 205, 86)',
                                                                data: memoryPerc.slice(-10)
                                                            }]
                                                        }} options={{
                                                            plugins: {  // 'legend' now within object 'plugins {}'
                                                                legend: {
                                                                    labels: {
                                                                        color: "white",  // not 'fontColor:' anymore
                                                                        // fontSize: 18  // not 'fontSize:' anymore
                                                                        font: {
                                                                            size: 15 // 'size' now within object 'font {}'
                                                                        }
                                                                    }
                                                                }
                                                            },
                                                            scales: {
                                                                x: {
                                                                    ticks: {
                                                                        color: 'white'
                                                                    },
                                                                    grid: {
                                                                        color: 'rgb(40,44,52)',
                                                                        borderColor: 'white'
                                                                    }
                                                                },
                                                                y: {
                                                                    ticks: {
                                                                        color: 'white'
                                                                    },
                                                                    grid: {
                                                                        color: 'rgb(40,44,52)',
                                                                        borderColor: 'white'
                                                                    }
                                                                },
                                                            }
                                                        }} height={400} width={600} />
                                                        <Bar data={{
                                                            labels: dates.slice(-10),
                                                            datasets: [{
                                                                label: 'Memory Used(MiB)',
                                                                fill: true,
                                                                backgroundColor: 'rgba(255, 205, 86, 0.2)',
                                                                borderColor: 'rgb(255, 205, 86)',
                                                                borderWidth: '3',
                                                                data: memoryUsage.slice(-10)
                                                            }]
                                                        }} options={{
                                                            plugins: {  // 'legend' now within object 'plugins {}'
                                                                legend: {
                                                                    labels: {
                                                                        color: "white",  // not 'fontColor:' anymore
                                                                        // fontSize: 18  // not 'fontSize:' anymore
                                                                        font: {
                                                                            size: 15 // 'size' now within object 'font {}'
                                                                        }
                                                                    }
                                                                }
                                                            },
                                                            scales: {
                                                                x: {
                                                                    ticks: {
                                                                        color: 'white'
                                                                    },
                                                                    grid: {
                                                                        color: 'rgb(40,44,52)',
                                                                        borderColor: 'white'
                                                                    }
                                                                },
                                                                y: {
                                                                    ticks: {
                                                                        color: 'white'
                                                                    },
                                                                    grid: {
                                                                        color: 'rgb(40,44,52)',
                                                                        borderColor: 'white'
                                                                    }
                                                                },
                                                            }
                                                        }} height={400} width={600} />

                                                    </div>

                                                    <br></br>
                                                    <br></br>
                                                    <br></br>
                                                    <br></br>
                                                    <br></br>
                                                    <br></br>
                                                    <div style={{ display: 'flex', gap: '170px' }}>
                                                        <Doughnut data={{
                                                            labels: ["Memory Used in MiB", "Memory Free in GiB"],
                                                            datasets: [{
                                                                label: 'Memory Used(GiB)',
                                                                fill: true,
                                                                backgroundColor: ['rgba(255, 205, 86, 0.2)', 'rgba(75, 192, 192, 0.2)'],
                                                                borderColor: 'white',
                                                                borderWidth: '2',
                                                                data: [memoryUsage[memoryUsage.length - 1], parseFloat(fullData - parseFloat(memoryUsage[memoryUsage.length - 1] / 1000))]
                                                            }]
                                                        }} options={{
                                                            maintainAspectRatio: false,
                                                            plugins: {  // 'legend' now within object 'plugins {}'
                                                                legend: {
                                                                    labels: {
                                                                        color: "white",  // not 'fontColor:' anymore
                                                                        // fontSize: 18  // not 'fontSize:' anymore
                                                                        font: {
                                                                            size: 15 // 'size' now within object 'font {}'
                                                                        }
                                                                    }
                                                                }
                                                            }

                                                        }} height={400} width={600} />

                                                        <Bar data={{
                                                            labels: dates.slice(-10),
                                                            datasets: [{
                                                                label: 'Cache(MiB)',
                                                                fill: true,
                                                                backgroundColor: ['rgba(255, 205, 86, 0.2)', 'rgba(201, 203, 207, 0.2)'],
                                                                borderColor: 'white',
                                                                borderWidth: '2',
                                                                data: cache.slice(-10)
                                                            }]
                                                        }} options={{
                                                            plugins: {  // 'legend' now within object 'plugins {}'
                                                                legend: {
                                                                    labels: {
                                                                        color: "white",  // not 'fontColor:' anymore
                                                                        // fontSize: 18  // not 'fontSize:' anymore
                                                                        font: {
                                                                            size: 15 // 'size' now within object 'font {}'
                                                                        }
                                                                    }
                                                                }
                                                            },
                                                            scales: {
                                                                x: {
                                                                    ticks: {
                                                                        color: 'white'
                                                                    },
                                                                    grid: {
                                                                        color: 'rgb(40,44,52)',
                                                                        borderColor: 'white'
                                                                    }
                                                                },
                                                                y: {
                                                                    ticks: {
                                                                        color: 'white'
                                                                    },
                                                                    grid: {
                                                                        color: 'rgb(40,44,52)',
                                                                        borderColor: 'white'
                                                                    }
                                                                },
                                                            }
                                                        }} height={400} width={600} />



                                                    </div>

                                                    <div style={{ display: 'flex', gap: '170px', marginTop: '550px' }}>
                                                        <Line data={{
                                                            labels: dates.slice(-10),
                                                            datasets: [{
                                                                label: 'CPU Percentage %',
                                                                fill: true,
                                                                backgroundColor: 'rgba(255, 205, 86, 0.2)',
                                                                pointBorderColor: 'white',
                                                                pointBorderWidth: 3,
                                                                pointRadius: 3,
                                                                tension: 0.4,
                                                                borderColor: 'rgb(255, 205, 86)',
                                                                data: cpuPercent.slice(-10)
                                                            }]
                                                        }} options={{
                                                            plugins: {  // 'legend' now within object 'plugins {}'
                                                                legend: {
                                                                    labels: {
                                                                        color: "white",  // not 'fontColor:' anymore
                                                                        // fontSize: 18  // not 'fontSize:' anymore
                                                                        font: {
                                                                            size: 15 // 'size' now within object 'font {}'
                                                                        }
                                                                    }
                                                                }
                                                            },
                                                            scales: {
                                                                x: {
                                                                    beginAtZero: true,
                                                                    ticks: {
                                                                        color: 'white'
                                                                    },
                                                                    grid: {
                                                                        color: 'rgb(40,44,52)',
                                                                        borderColor: 'white'
                                                                    }
                                                                },
                                                                y: {
                                                                    beginAtZero: true,
                                                                    ticks: {
                                                                        color: 'white'
                                                                    },
                                                                    grid: {
                                                                        color: 'rgb(40,44,52)',
                                                                        borderColor: 'white'
                                                                    }
                                                                },
                                                            }
                                                        }} height={400} width={600} />

                                                        <Line data={{
                                                            labels: dates.slice(-10),
                                                            datasets: [{
                                                                label: 'User mode usage %',
                                                                fill: true,
                                                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                                                pointBorderColor: 'white',
                                                                pointBorderWidth: 3,
                                                                pointRadius: 3,
                                                                tension: 0.1,
                                                                borderColor: 'rgb(75, 192, 192)',
                                                                data: userMode.slice(-10)
                                                            },
                                                            {
                                                                label: 'Kernel mode usage %',
                                                                fill: true,
                                                                backgroundColor: 'rgba(255, 205, 86, 0.2)',
                                                                pointBorderColor: 'white',
                                                                pointBorderWidth: 3,
                                                                pointRadius: 3,
                                                                tension: 0.1,
                                                                borderColor: 'rgb(255, 205, 86)',
                                                                data: kernelMode.slice(-10)
                                                            }]
                                                        }} options={{
                                                            plugins: {  // 'legend' now within object 'plugins {}'
                                                                legend: {
                                                                    labels: {
                                                                        color: "white",  // not 'fontColor:' anymore
                                                                        // fontSize: 18  // not 'fontSize:' anymore
                                                                        font: {
                                                                            size: 15 // 'size' now within object 'font {}'
                                                                        }
                                                                    }
                                                                }
                                                            },
                                                            scales: {
                                                                x: {
                                                                    beginAtZero: true,
                                                                    ticks: {
                                                                        color: 'white'
                                                                    },
                                                                    grid: {
                                                                        color: 'rgb(40,44,52)',
                                                                        borderColor: 'white'
                                                                    }
                                                                },
                                                                y: {
                                                                    beginAtZero: true,
                                                                    ticks: {
                                                                        color: 'white'
                                                                    },
                                                                    grid: {
                                                                        color: 'rgb(40,44,52)',
                                                                        borderColor: 'white'
                                                                    }
                                                                },
                                                            }
                                                        }} height={400} width={600} />



                                                    </div>

                                                    <div style={{ display: 'flex', gap: '170px', marginTop: '680px' }}>
                                                        <Line data={{
                                                            labels: dates.slice(-10),
                                                            datasets: [{
                                                                label: 'Tx/Rx rate %',
                                                                fill: true,
                                                                backgroundColor: 'rgba(255, 205, 86, 0.2)',
                                                                pointBorderColor: 'white',
                                                                pointBorderWidth: 3,
                                                                pointRadius: 3,
                                                                tension: 0.4,
                                                                borderColor: 'rgb(255, 205, 86)',
                                                                data: rate.slice(-10)
                                                            }]
                                                        }} options={{
                                                            plugins: {  // 'legend' now within object 'plugins {}'
                                                                legend: {
                                                                    labels: {
                                                                        color: "white",  // not 'fontColor:' anymore
                                                                        // fontSize: 18  // not 'fontSize:' anymore
                                                                        font: {
                                                                            size: 15 // 'size' now within object 'font {}'
                                                                        }
                                                                    }
                                                                }
                                                            },
                                                            scales: {
                                                                x: {
                                                                    beginAtZero: true,
                                                                    ticks: {
                                                                        color: 'white'
                                                                    },
                                                                    grid: {
                                                                        color: 'rgb(40,44,52)',
                                                                        borderColor: 'white'
                                                                    }
                                                                },
                                                                y: {
                                                                    beginAtZero: true,
                                                                    ticks: {
                                                                        color: 'white'
                                                                    },
                                                                    grid: {
                                                                        color: 'rgb(40,44,52)',
                                                                        borderColor: 'white'
                                                                    }
                                                                },
                                                            }
                                                        }} height={400} width={600} />

                                                        <Line data={{
                                                            labels: dates.slice(-10),
                                                            datasets: [{
                                                                label: 'Received Data (Rx) MiB',
                                                                fill: true,
                                                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                                                pointBorderColor: 'white',
                                                                pointBorderWidth: 3,
                                                                pointRadius: 3,
                                                                tension: 0.1,
                                                                borderColor: 'rgb(75, 192, 192)',
                                                                data: txBytes.slice(-10)
                                                            },
                                                            {
                                                                label: 'Transmitted data (Tx) MiB',
                                                                fill: true,
                                                                backgroundColor: 'rgba(255, 205, 86, 0.2)',
                                                                pointBorderColor: 'white',
                                                                pointBorderWidth: 3,
                                                                pointRadius: 3,
                                                                tension: 0.1,
                                                                borderColor: 'rgb(255, 205, 86)',
                                                                data: rxBytes.slice(-10)
                                                            }]
                                                        }} options={{
                                                            plugins: {  // 'legend' now within object 'plugins {}'
                                                                legend: {
                                                                    labels: {
                                                                        color: "white",  // not 'fontColor:' anymore
                                                                        // fontSize: 18  // not 'fontSize:' anymore
                                                                        font: {
                                                                            size: 15 // 'size' now within object 'font {}'
                                                                        }
                                                                    }
                                                                }
                                                            },
                                                            scales: {
                                                                x: {
                                                                    beginAtZero: true,
                                                                    ticks: {
                                                                        color: 'white'
                                                                    },
                                                                    grid: {
                                                                        color: 'rgb(40,44,52)',
                                                                        borderColor: 'white'
                                                                    }
                                                                },
                                                                y: {
                                                                    beginAtZero: true,
                                                                    ticks: {
                                                                        color: 'white'
                                                                    },
                                                                    grid: {
                                                                        color: 'rgb(40,44,52)',
                                                                        borderColor: 'white'
                                                                    }
                                                                },
                                                            }
                                                        }} height={400} width={600} />



                                                    </div>

                                                    <div style={{ display: 'flex', gap: '170px', marginTop: '120px' }}>
                                                        <Bar data={{
                                                            labels: dates.slice(-10),
                                                            datasets: [{
                                                                label: 'Tx Packets',
                                                                fill: true,
                                                                backgroundColor: 'rgba(255, 205, 86, 0.2)',
                                                                borderColor: 'rgb(255, 205, 86)',
                                                                borderWidth: '3',
                                                                data: txPackets.slice(-10)
                                                            },
                                                            {
                                                                label: 'Rx Packets',
                                                                fill: true,
                                                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                                                borderColor: 'rgb(75, 192, 192)',
                                                                borderWidth: '3',
                                                                data: rxPackets.slice(-10)
                                                            }]
                                                        }} options={{
                                                            plugins: {  // 'legend' now within object 'plugins {}'
                                                                legend: {
                                                                    labels: {
                                                                        color: "white",  // not 'fontColor:' anymore
                                                                        // fontSize: 18  // not 'fontSize:' anymore
                                                                        font: {
                                                                            size: 15 // 'size' now within object 'font {}'
                                                                        }
                                                                    }
                                                                }
                                                            },
                                                            scales: {
                                                                x: {
                                                                    ticks: {
                                                                        color: 'white'
                                                                    },
                                                                    grid: {
                                                                        color: 'rgb(40,44,52)',
                                                                        borderColor: 'white'
                                                                    }
                                                                },
                                                                y: {
                                                                    ticks: {
                                                                        color: 'white'
                                                                    },
                                                                    grid: {
                                                                        color: 'rgb(40,44,52)',
                                                                        borderColor: 'white'
                                                                    }
                                                                },
                                                            }
                                                        }} height={400} width={600} />
                                                        <Line data={{
                                                            labels: dates.slice(-10),
                                                            datasets: [{
                                                                label: 'Rx Dropped',
                                                                fill: true,
                                                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                                                pointBorderColor: 'white',
                                                                pointBorderWidth: 3,
                                                                pointRadius: 3,
                                                                tension: 0.1,
                                                                borderColor: 'rgb(75, 192, 192)',
                                                                data: rxDropped.slice(-10)
                                                            },
                                                            {
                                                                label: 'Rx Errors',
                                                                fill: true,
                                                                backgroundColor: 'rgba(255, 205, 86, 0.2)',
                                                                pointBorderColor: 'white',
                                                                pointBorderWidth: 3,
                                                                pointRadius: 3,
                                                                tension: 0.1,
                                                                borderColor: 'rgb(255, 205, 86)',
                                                                data: rxErrors.slice(-10)
                                                            },
                                                            {
                                                                label: 'Tx Dropped',
                                                                fill: true,
                                                                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                                                                pointBorderColor: 'white',
                                                                pointBorderWidth: 3,
                                                                pointRadius: 3,
                                                                tension: 0.1,
                                                                borderColor: 'rgb(153, 102, 255)',
                                                                data: txDropped.slice(-10)
                                                            },
                                                            {
                                                                label: 'Tx Errors',
                                                                fill: true,
                                                                backgroundColor: 'rgba(201, 203, 207, 0.2)',
                                                                pointBorderColor: 'white',
                                                                pointBorderWidth: 3,
                                                                pointRadius: 3,
                                                                tension: 0.1,
                                                                borderColor: 'rgb(201, 203, 207)',
                                                                data: txErrors.slice(-10)
                                                            }
                                                            ]
                                                        }} options={{
                                                            plugins: {  // 'legend' now within object 'plugins {}'
                                                                legend: {
                                                                    labels: {
                                                                        color: "white",  // not 'fontColor:' anymore
                                                                        // fontSize: 18  // not 'fontSize:' anymore
                                                                        font: {
                                                                            size: 15 // 'size' now within object 'font {}'
                                                                        }
                                                                    }
                                                                }
                                                            },
                                                            scales: {
                                                                x: {
                                                                    beginAtZero: true,
                                                                    ticks: {
                                                                        color: 'white'
                                                                    },
                                                                    grid: {
                                                                        color: 'rgb(40,44,52)',
                                                                        borderColor: 'white'
                                                                    }
                                                                },
                                                                y: {
                                                                    beginAtZero: true,
                                                                    ticks: {
                                                                        color: 'white'
                                                                    },
                                                                    grid: {
                                                                        color: 'rgb(40,44,52)',
                                                                        borderColor: 'white'
                                                                    }
                                                                },
                                                            }
                                                        }} height={400} width={600} />




                                                    </div>


                                                </div>)
                                                : (<div></div>)
                                        }

                                    </div>
                                </div>
                            </div>) : (<div style={style}><HashLoader color='white' speedMultiplier={2}></HashLoader></div>)
                        }

                        {graph ? (<div class="col s12 m7" style={{
                            margin: "10px auto",
                        }}>
                            <br></br>
                            <br></br>



                            <div><p id='yellow-textLarge' className='centered'>MEMORY STATS</p></div>
                            <div style={{ display: 'flex', marginTop: '30px' }}>
                                <div class="circle-centered" style={{ margin: '50px auto' }}>
                                    <div style={{ textAlign: 'center' }}><b class="text-circle-centered">{memoryPerc[memoryPerc.length - 1]} % MEM used</b></div>
                                </div>
                                <div class="circle-centered" style={{ margin: '50px auto' }}>
                                    <div style={{ textAlign: 'center' }}><b class="text-circle-centered">{memoryUsage[memoryUsage.length - 1]} MiB MEM used</b></div>
                                </div>
                                <div class="circle-centered" style={{ margin: '50px auto' }}>
                                    <div style={{ textAlign: 'center' }}><b class="text-circle-centered">{fullData} GiB MEM Limit</b></div>
                                </div>
                                <div class="circle-centered" style={{ margin: '50px auto' }}>
                                    <div style={{ textAlign: 'center' }}><b class="text-circle-centered">{cache[cache.length - 1]} MiB cache</b></div>
                                </div>
                            </div>


                            <div style={{ marginTop: "1300px" }}><p id='yellow-textLarge' className='centered'>CPU STATS</p></div>
                            <div style={{ display: 'flex' }}>
                                <div class="circle-centered" style={{ margin: '50px auto' }}>
                                    <div style={{ textAlign: 'center' }}><b class="text-circle-centered">{onlineCPU} online CPUs</b></div>
                                </div>
                                <div class="circle-centered" style={{ margin: '50px auto' }}>
                                    <div style={{ textAlign: 'center' }}><b class="text-circle-centered">{cpuPercent[cpuPercent.length - 1]} % <br></br> CPU Usage</b></div>
                                </div>
                                <div class="circle-centered" style={{ margin: '50px auto' }}>
                                    <div style={{ textAlign: 'center' }}><b class="text-circle-centered">{userMode[userMode.length - 1]} % User Mode </b></div>
                                </div>
                                <div class="circle-centered" style={{ margin: '50px auto' }}>
                                    <div style={{ textAlign: 'center' }}><b class="text-circle-centered">{kernelMode[kernelMode.length - 1]} % Kernel Mode</b></div>
                                </div>
                            </div>

                            <div style={{ marginTop: "700px" }}><p id='yellow-textLarge' className='centered'>NETWORK STATS</p></div>
                            <div style={{ textAlign: 'center', width: "800px", margin: '50px auto' }}>
                                <div class="card horizontal">
                                    <div id='flex' style={{ width: '100%' }}>
                                        <div class="card-content" id='to-center'>
                                            <p id='white-text-large'>Network : <b id='yellow-text'>{networks[0]}</b></p>

                                            <br></br>

                                            <p id='white-text-large'>Received data (Rx) : <b id='yellow-text'>{rxBytes[rxBytes.length - 1]} MiB</b></p>
                                            <p id='white-text-large'>Rx packets: <b id='yellow-text'>{rxPackets[rxPackets.length - 1]} </b></p>
                                            <p id='white-text-large'>Rx dropped: <b id='yellow-text'>{rxDropped[rxDropped.length - 1]} </b></p>
                                            <p id='white-text-large'>Rx errors: <b id='yellow-text'>{rxErrors[rxErrors.length - 1]} </b></p>

                                            <br></br>

                                            <p id='white-text-large'>Transmitted data (Tx) : <b id='yellow-text'>{txBytes[txBytes.length - 1]} MiB</b></p>
                                            <p id='white-text-large'>Tx packets: <b id='yellow-text'>{txPackets[txPackets.length - 1]} </b></p>
                                            <p id='white-text-large'>Tx dropped: <b id='yellow-text'>{txDropped[txDropped.length - 1]} </b></p>
                                            <p id='white-text-large'>Tx errors: <b id='yellow-text'>{txErrors[txErrors.length - 1]} </b></p>
                                            <br></br>
                                            <p id='white-text-large'>Tx/Rx rate : <b id='yellow-text'>{rate[rate.length - 1]} </b></p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>) : (<div></div>)
                        }
                    </div >)
            }
        </div >
    )

}

export default ContainerData