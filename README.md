# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- **@vitejs/plugin-react** — uses Babel (or oxc when used in rolldown-vite) for Fast Refresh  
- **@vitejs/plugin-react-swc** — uses SWC for Fast Refresh  

---

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances.  
To add it, see the official documentation on the React website.

---

## Expanding the ESLint configuration

If you are developing a production application, we recommend using **TypeScript** with type-aware lint rules enabled.  
Check out the React + TypeScript template to learn how to integrate `typescript-eslint`.

---

## Preview

![Preview](public/assets/Animation2.gif)

---

## Panduan Pakai JSON – Visual Novel Engine

```text
============================================================
PANDUAN PAKAI JSON UNTUK VISUAL NOVEL ENGINE
============================================================

SETIAP LINE PADA CHAPTER ADALAH OBJECT JSON DALAM ARRAY.

Contoh:
[
  { id:"intro-1", type:"narration", text:"Hari itu hujan..." },
  { id:"intro-2", type:"dialogue", speakerId:"mc", text:"Apa yang terjadi?" }
]

------------------------------------------------------------
stage.reset = true
------------------------------------------------------------
Membersihkan semua karakter & objek sebelum menggambar adegan baru.
Gunakan untuk transisi antar adegan atau masuk scene baru.

Contoh:
{ id:"scene-1", stage:{ reset:true } }

------------------------------------------------------------
stage.background
------------------------------------------------------------
Bisa berupa string:
"school_day"

Atau object:
{
  image:"school_day",
  overlay:25,
  transition:{ type:"fade", duration:800 }
}

------------------------------------------------------------
stage.characters
------------------------------------------------------------
Daftar karakter di layar (snapshot state)

Properti:
- id (WAJIB)
- name (untuk display di dialogue box)
- image (file .png di folder sprites)
- position: 'left' | 'center' | 'right' | { x, y }
- movement: animasi (misalnya: shake, slide-left)
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

------------------------------------------------------------
stage.objects
------------------------------------------------------------
Digunakan untuk benda, foto, UI, atau objek lore.
Dapat memaksa assetType:"bg".

------------------------------------------------------------
speakerId
------------------------------------------------------------
Menentukan karakter yang sedang berbicara.

Contoh:
{ type:"dialogue", speakerId:"hana", text:"Aku baik-baik saja!" }

------------------------------------------------------------
TRANSITION
------------------------------------------------------------
Bisa diletakkan pada level line:
transition:"fade"
transition:{ type:"slide-left", duration:600 }

------------------------------------------------------------
type:"choice"
------------------------------------------------------------
Memunculkan pilihan.

Struktur:
{
  type:"choice",
  choices:[
    { text:"Tanya lagi", jumpTo:"question-2" },
    { text:"Diam saja", result:"lose" }
  ]
}

------------------------------------------------------------
type:"question"
------------------------------------------------------------
Dipakai untuk quiz / tebak jawaban.

{
  type:"question",
  correctAnswer:"42",
  hint:"Jawaban hidup...",
  consequenceIfCorrect:"continue",
  consequenceIfWrong:"neutral"
}

------------------------------------------------------------
_comment
------------------------------------------------------------
Digunakan untuk dokumentasi internal.
Tidak dibaca engine.

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
```
