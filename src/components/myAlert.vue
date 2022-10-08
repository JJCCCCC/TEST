<template>
    <div class="alert">
        <p>{{message}}</p>
    </div>
</template>

<style lang="scss" scoped>
.alert {
    width: 100%;
    height: 50px;
    position: fixed;
    bottom:60px;
    left: 0;
    padding: 0 30px;
    z-index: 999;
    box-sizing: border-box;
    p {
        padding: 0;
        margin: 0;
        height: 50px;
        line-height: 50px;
        background-color: rgba(0,0,0,0.65);
        border-radius: 6px;
        color: #f6b157;
        text-align: center;
        font-size: 16px;
    }
}
</style>

<script>
export default {
    props:["message"]
}
</script>