<template>
    <div class="cart">
        <div class="container">
            <div class="cart__content">
                <div class="cart__content-left">
                    <div class="cart__content-left-card">
                        <div class="cart__content-left-card-img">
                            <img src="../assets/img/card-img.webp" alt="">
                        </div>
                        <div class="cart__content-left-card-texts">
                            <h4>Galaxy Z Flip5<span>1000$</span></h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, vel.</p>
                            <div>
                                
                               <div class="btns">
                                <button><font-awesome-icon icon="minus" /></button>
                                <p>0</p>
                                <button><font-awesome-icon icon="plus" /></button>
                            </div> 
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div class="cart__content-right">
                    <div class="cart__content-right-prices">
                        <p>Mahsulot soni: <span>1</span></p>
                        <p>Umumiy narx: <span>1$</span></p>
                    </div>
                    <div class="cart__content-right-delivery">
                        <font-awesome-icon icon="truck" />
                        <p>Siz uchun bepul yetkazib berish xizmati mavjud.</p>
                    </div>
                    <router-link to="/">buyurtmani tasdiqlash</router-link>
                </div>
            </div>
        </div>
    </div>
    <div class="nothing">
        <div class="container">
            <div class="nothing__content">
                <svg width="150px" height="150px" viewBox="-3.12 -3.12 30.24 30.24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#2b2b2b" transform="rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(3.3599999999999994,3.3599999999999994), scale(0.72)"><path transform="translate(-3.12, -3.12), scale(1.8900000000000001)" fill="#ffe9d1" d="M9.166.33a2.25 2.25 0 00-2.332 0l-5.25 3.182A2.25 2.25 0 00.5 5.436v5.128a2.25 2.25 0 001.084 1.924l5.25 3.182a2.25 2.25 0 002.332 0l5.25-3.182a2.25 2.25 0 001.084-1.924V5.436a2.25 2.25 0 00-1.084-1.924L9.166.33z" strokewidth="0"></path></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#3b3b3b3b" stroke-width="0.048"></g><g id="SVGRepo_iconCarrier"> <path d="M21 5L19 12H7.37671M20 16H8L6 3H3M11 3L13.5 5.5M13.5 5.5L16 8M13.5 5.5L16 3M13.5 5.5L11 8M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="#000000" stroke-width="1.032" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                <h6>Savatchangiz hozircha boʻsh</h6>
                <p>Asosiy sahifada xaridlarni boshlang yoki mahsulotlarni savatchaga qoʻshish uchun kerakli kategoriyaga oʻting.</p>
                <router-link to="/" class="nothing__content-link">O'tish</router-link>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>
