import React from "react";
import NavBar from "../components/layoutComponent/NavBar";
import Account from "../components/layoutComponent/Account";
import { getCurrentWindow } from "@tauri-apps/api/window";
import LogoAltaria from '../assets/img/logo.png'
import CerrarVentana from '../assets/svg/CerrarVentana.svg'
import MinimizarVentana from '../assets/svg/MinimizarVentana.svg'
import PantallaCompleta from '../assets/svg/PantallaCompleta.svg'


function layout({ children }: { children: React.ReactNode }) {
    const ventana = getCurrentWindow()
    return (
        <>
            <div className='w-screen h-screen flex flex-col'>
                <div className='w-full flex justify-between'>
                    <div className='flex bg-white w-full p-1.5 items-center gap-3' data-tauri-drag-region>
                        <img src={LogoAltaria} className='size-5' data-tauri-drag-region />
                        <p className='' data-tauri-drag-region>Tpv</p>
                    </div>
                    <div>
                        <div className='flex gap-4 w-fit p-1 px-2'>
                            <button className='hover:scale-140 transition-all cursor-pointer' onClick={async () => await ventana.minimize()}><img src={MinimizarVentana} className='size-8' /></button>
                            <button className='hover:scale-120 transition-all cursor-pointer' onClick={async () => await ventana.toggleMaximize()}><img src={PantallaCompleta} className='size-5' /></button>
                            <button className='hover:scale-120 transition-all cursor-pointer' onClick={async () => await ventana.close()}><img src={CerrarVentana} className='size-8' /></button>
                        </div>
                    </div>
                </div>
                <div className="flex h-full">
                    <div className="">
                        <NavBar rol="admin" />
                        <Account rol="admin" />
                    </div>
                    <main className="flex-1 h-full bg-gris">{children}</main>
                </div>
            </div >
        </>
    );
}

export default layout;
