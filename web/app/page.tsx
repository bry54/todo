"use client";
import Image from 'next/image'
import {useEffect, useState} from "react";
import Web3 from 'web3';
import {todoContractABI} from "../data";

export default function Home() {

    const [web3, setWeb3] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [taskCount, setTaskCount] = useState(0);

    const loadTasks = async () => {
        const taskCount = await window.todoContract.methods.taskCount().call();
        const loadedTasks = [];

        for (let i = 1; i <= taskCount; i++) {
            const task = await window.todoContract.methods.tasks(i).call();
            loadedTasks.push(task);
        }

        setTasks(loadedTasks);
    };

    useEffect(() => {
        const initWeb3 = async () => {
            if (window.ethereum) {
                window.web3 = new Web3(window.ethereum);
                try {
                    await window.ethereum.enable();
                } catch (error) {
                    console.error("User denied account access");
                }
                console.info('initWeb3: Success in window.etherium')
            } else if (window.web3) {
                window.web3 = new Web3(window.web3.currentProvider);
                console.info('initWeb3: Success in window.web3')
            } else {
                console.error("No Ethereum provider detected. Install MetaMask!");
            }

            setWeb3(window.web3);

            const contractAddress = '0x5c1Dcb4E173c22a5F1427a260997e4376cA566a4';

            window.todoContract = new window.web3.eth.Contract(todoContractABI, contractAddress);
        };

        initWeb3();
    }, []);

    useEffect(() => {
        if (web3) {
            loadTasks();
        }
    }, [web3]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <p className="uppercase fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                    Todo
                </p>
                <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
                    <a
                        className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
                        href="https://ethereum.org/en/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <code>Powered By{' '}</code>
                        <Image
                            src="/eth-rainbow.png"
                            alt="Etherium Logo"
                            //className="dark:invert"
                            width={25}
                            height={6}
                            priority
                        /> <code>{' '} ETH Network</code>
                    </a>
                </div>
            </div>

            <div className="relative flex place-items-left before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
                <ul className="menu-list">
                    {tasks.map((task) => (
                        <li key={task.id}>
                            <button
                                type="checkbox"
                                //checked={task.completed}
                                onClick={() => console.info(task.id)}
                            />
                            <span className={task.completed ? 'completed' : ''}>{task.title}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">

            </div>
        </main>
    )
}
