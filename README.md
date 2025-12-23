# React + Vite

![Preview GIF](https://files.catbox.moe/6ybilf.gif)

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


/* 
============================================================
        PANDUAN PAKAI JSON UNTUK VISUAL NOVEL ENGINE
============================================================

1.  SETIAP LINE PADA CHAPTER ADALAH OBJECT JSON DALAM ARRAY.
    Contoh:
    [
      { id:"intro-1", type:"narration", text:"Hari itu hujan..." },
      { id:"intro-2", type:"dialogue", speakerId:"mc", text:"Apa yang terjadi?" }
    ]

2.  stage.reset = true  
    - Membersihkan semua karakter & objek sebelum menggambar adegan baru.
    - Gunakan untuk transisi antar adegan atau masuk scene baru.
    Contoh:
    {
      id:"scene-1",
      stage:{ reset:true }
    }

3.  stage.background
    - Bisa berupa string: "school_day"
    - Atau object:
      {
        image:"school_day",
        overlay:25,     // gelap-terang layer gelap (0–100)
        transition:{ type:"fade", duration:800 }
      }

4.  stage.characters = daftar karakter di layar (snapshot state)
    Properti:
    - id (WAJIB)
    - name (untuk display di dialogue box)
    - image (file .png di folder sprites)
    - position: 'left' | 'center' | 'right' | { x, y }
    - movement: animasi (misalnya: "shake", "slide-left")
    - scale: angka
    - layer: urutan tumpukan
    - isSpeaking: boolean
    - assetType: folder custom (default: sprites)

    Contoh:
    {
      stage:{
        characters:[
          { id:"mc", name:"Raka", image:"mc/happy", position:"left" },
          { id:"hana", image:"hana/neutral", position:"right", isSpeaking:true }
        ]
      }
    }

5.  stage.objects  
    - Sama seperti characters, tapi dipakai untuk Benda, Foto, UI, Objek lore.
    - Bisa memaksa assetType:"bg" untuk pakai folder lain.

6.  speakerId  
    - Menentukan karakter yang sedang berbicara.
    - Jika kosong, engine pakai speakerName / field character.

    Contoh:
    {
      type:"dialogue",
      speakerId:"hana",
      text:"Aku baik-baik saja!"
    }

7.  TRANSITION  
    - Bisa diletakkan pada level line:
      transition:"fade"
      transition:{ type:"slide-left", duration:600 }

    - Bisa juga ada otomatis bila background atau karakter berubah.

8.  type:"choice"
    Memunculkan pilihan.
    Struktur:
    {
      type:"choice",
      choices:[
        { text:"Tanya lagi", jumpTo:"question-2" },
        { text:"Diam saja", result:"lose" }
      ]
    }

    - jumpTo lompat ke id line tertentu.
    - result:"lose" → memunculkan LoseOverlay.

9.  type:"question"
    Dipakai untuk quiz/tebak jawaban.
    {
      type:"question",
      correctAnswer:"42",
      hint:"Jawaban hidup...",
      consequenceIfCorrect:"continue",
      consequenceIfWrong:"neutral"
    }

10. Gunakan _comment untuk dokumentasi internal  
    Tidak terbaca engine. Aman untuk catatan:
    "_comment": [
      "Ini hanya catatan",
      "Tidak mempengaruhi game"
    ]

============================================================
                 CONTOH LINE LENGKAP
============================================================
{
  "id": "scene-1",
  "type": "dialogue",
  "text": "Selamat pagi!",
  "speakerId": "mc",
  "stage": {
    "reset": true,
    "background": {
      "image": "classroom_morning",
      "overlay": 20,
      "transition": { "type": "fade", "duration": 600 }
    },
    "characters": [
      {
        "id": "mc",
        "name": "Raka",
        "image": "mc/happy",
        "position": "left",
        "isSpeaking": true
      },
      {
        "id": "hana",
        "name": "Hana",
        "image": "hana/smile",
        "position": "right"
      }
    ]
  }
}
============================================================
*/




