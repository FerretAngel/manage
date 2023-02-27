<script setup>
import { ref, reactive } from 'vue';
import { ElNotification } from 'element-plus'
import http from '../api/index';
import { useRouter } from 'vue-router';
const router = useRouter();
let user = reactive({
    username: '任红',       
    password: '12345',
    age: 22,
    sex: '男',
    number: '13684164155',
    card: '511528200102097810'
})
let isLogin = ref(true);
let type = ref(0)//0患者，1医生，2管理员
let pathArr = ['/user', '/doctor', '/admin']
function login() {
    http.post(pathArr[type.value] + '/login', user).then((res) => {
        if (!res.success) {
            ElNotification({
                title: '登录失败',
                message: res.message,
                type: 'error'
            })
            return;
        }
        //登录成功
        ElNotification({
            title: '登录成功',
            message: res.message,
            type: 'success'
        })
        //判断不同用户
        if (type.value == 0) {
            router.push({ name: 'user' })
        } else if (type.value == 1) {
            router.push({ name: 'doctor' })
        } else {
            router.push({ name: 'admin' })
        }
    })
}

function register() {
    if (type.value == 2) {
        ElNotification({
            title: '注册失败',
            message: '请选择用户类型',
            type: 'error'
        })
        return;
    }
    http.post(pathArr[type.value] + '/add', user).then((res) => {
        if (!res.success) {
            ElNotification({
                title: '注册失败',
                message: res.message,
                type: 'error'
            })
            return;
        }
        //登录成功
        ElNotification({
            title: '注册成功',
            message: res.message,
            type: 'success'
        })
        isLogin.value=true;
    })
}

//输入验证
function checkInput() {
    //检查用户名密码长度
    if (user.username.length < 1) {
        ElNotification({
            title: '输入验证失败',
            message: '账户长度应该大于4',
            type: 'error'
        })
        return false;
    } if (user.password.length < 4) {
        ElNotification({
            title: '输入验证失败',
            message: '账户长度应该大于4',
            type: 'error'
        })
        return false;
    }
    if (isLogin.value) {
        return true;
    }
    if (typeof(user.age) != 'number' || user.age < 0 || user.age > 150) {
        ElNotification({
            title: '输入验证失败',
            message: '年龄不合法',
            type: 'error'
        })
        return false;
    }
    if (!/^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(user.number)) {
        ElNotification({
            title: '输入验证失败',
            message: '手机号不合法',
            type: 'error'
        })
        return false;
    }
    if (type.value == 1) {
        return true;
    }
    if (!/^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/.test(user.card)) {
        ElNotification({
            title: '输入验证失败',
            message: '身份证号不合法',
            type: 'error'
        })
        return false;
    }
    return true;
}

//确认输入
function confirmInput() {
    if (!checkInput()) {
        return;
    }
    if (isLogin.value) {
        login();
        return;
    }
    register();
}
</script>

<template>
    <section class="body">
        <section class="card">
            <h1>{{ isLogin ? '登录' : '注册' }}</h1>
            <el-input placeholder="账户" v-model="user.username" type="text"></el-input>
            <el-input placeholder="密码" v-model="user.password" type="password"></el-input>

            <!-- 注册 -->
            <transition name="heightZero">
                <section v-if="!isLogin">
                    <el-input placeholder="年龄" min="0" max="150" v-model.number="user.age" type="number"></el-input>
                    <el-input placeholder="手机号" v-model="user.number" type="text"></el-input>
                    <transition name="heightZero">
                        <el-input placeholder="身份证" v-model="user.card" type="text" v-if="type == 0"></el-input>
                    </transition>
                    <section class="chose">
                        <el-radio-group v-model="user.sex">
                            <el-radio-button label="男" />
                            <el-radio-button label="女" />
                        </el-radio-group>
                    </section>
                </section>
            </transition>
            <!-- 类型选择 -->
            <section class="chose">
                <el-radio-group v-model="type">
                    <el-radio-button label="0">患者</el-radio-button>
                    <el-radio-button label="1">医生</el-radio-button>
                    <el-radio-button label="2" v-if="isLogin">管理员</el-radio-button>
                </el-radio-group>
            </section>
            <!-- 登录操作 -->
            <section class="option">
                <el-button @click.stop="confirmInput" size="large">{{ isLogin ? '登录' : '注册' }}</el-button>
                <el-button @click.stop="isLogin = !isLogin" size="large">{{ isLogin ? '注册' : '登录' }}</el-button>
            </section>
        </section>
    </section>
</template>

<style scoped>
.chose {
    display: flex;
    justify-content: center;
}

.card {
    padding: 1em;
    width: 20em;
}

.option {
    display: flex;
    justify-content: space-evenly;
}

.body * {
    margin: 1em 0;
}

.body {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>