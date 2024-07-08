'use client'

import { auth } from "@/components/auth/Funcs/auth";  
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BaseBtn } from "@/components/buttons/BaseBtn/BaseBtn";
import { postData } from "@/components/post/postData";
import Scanner from "@/components/scanner/Scanner";
import ScannedCodesList from "@/components/scanner/ScannedCodesList";

export default function Home() {
  // checking authorization
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  useEffect(() => {
    const isAuth = auth(); 
    if (!isAuth) {
      router.push('./login');
    } else {
      setIsCheckingAuth(false)
    }
  }, [router]);

  const [showScanner, setShowScanner] = useState(false);
  const [scannedCodes, setScannedCodes] = useState([]);
  const [isLoadingPostCodes, setIsLoadingPostCodes] = useState(false);

  const handleScan = useCallback((code) => {
    setScannedCodes((prevCodes) => {
      return [...prevCodes, code];
    });
  }, []);

  const handleDelete = (index) => {
    setScannedCodes(prevCodes => prevCodes.filter((_, i) => i !== index));
  };
  const handleSend = async () => {
    if (scannedCodes.length < 1) {
      alert('Нет отсканированных штрихкодов!')
      return
    }

    setIsLoadingPostCodes(true);
    try {
      await postData(endpoint, scannedCodes);
      
      // clear scanned codes
      setScannedCodes([]); 
    } catch (error) {
      console.error("Error sending data:", error);
    } finally {
      setIsLoadingPostCodes(false);
    }
  };

  const endpoint = 'https://script.google.com/macros/s/AKfycbyaFftL2XzduHU49JOlhCu0KNEbGVj_eo6o31O1L6SQoD6oUmil_M1PRTYz7ZMVK8-tSQ/exec';

  return !isCheckingAuth ? (
    <div>
      <main className="">
        <div className="">
        {showScanner &&
          <div className="container">
            <div className="row">
              <BaseBtn classname="mar-b-20 col s10 offset-s1 m4 offset-m4 orange lighten-1" handler={() => setShowScanner(false)}>Закрыть сканер</BaseBtn>
            </div>
            <div className="row">
              <Scanner width={'100%'} classname="s12" onScan={handleScan} />
            </div>
          </div>
        }
          {!showScanner &&  
            <div className="center-align row">
              <BaseBtn classname="mar-r-16 mar-b-20 col s10 offset-s1 m3 offset-m3 orange lighten-1" handler={() => setShowScanner(true)}>🔎 Сканировать</BaseBtn>
              <BaseBtn classname={`col s10 offset-s1 m3 lime darken-4 ${isLoadingPostCodes ? 'loading' : ''}`} handler={handleSend}>
                {isLoadingPostCodes ? '⏳ Отправка...' : '📩 Отправить данные'}
              </BaseBtn>
            </div>    
          }
        </div>
        <div className="row">
          <ScannedCodesList onDelete={handleDelete} classname={'col s10 offset-s1 m9 offset-m3 '} scannedCodes={scannedCodes} /> 
        </div>
      </main>
    </div>
  ) : <h4 className="container">Checking authorization...⌛️ </h4>
}