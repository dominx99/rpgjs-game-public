<template>
    <div class="login-wrapper">
        <div class="login-box">
            <div class="login-title">Create account to play</div>
            <form @submit.prevent="createAccount">
                <input type="text" placeholder="Nickname" required v-model="user.nickname" @blur="checkExist">
                <input type="email" placeholder="Email" v-model="user.email">
                <input type="password" placeholder="Password (6 characters min.)" required minlength="6"
                    v-model="user.password">
                <input type="password" placeholder="Confirm Password" required v-model="confirmPassword">
                <button class="btn btn-success login">Create</button>
                <button class="btn css-button-3d--grey" type="button" @click="$emit('back')">Back</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

const NICKNAME_EXISTS_MSG = 'The nickname already exists, please choose another one'

export default {
    name: 'rpg-login',
    inject: ['rpgEngine', 'rpgGui'],
    data() {
        return {
            user: {},
            confirmPassword: '',
            nicknameExists: false
        }
    },
    computed: {
        apiUrl() {
            return this.rpgEngine.globalConfig.titleScreen?.apiUrl ?? this.rpgEngine.serverUrl
        }
    },
    methods: {
        async createAccount() {
            try {
                if (this.nicknameExists) {
                    throw NICKNAME_EXISTS_MSG
                }
                if (!this.user.nickname) {
                    throw 'Please enter a nickname'
                }
                if (!this.user.password) {
                    throw 'Please enter a password'
                }
                if (!this.user.email) {
                    throw 'Please enter an email'
                }
                if (this.user.password > 6) {
                    throw 'Set a password with at least 6 characters'
                }
                if (this.user.password != this.confirmPassword) {
                    throw 'The confirmed password is different from the password'
                }
                await axios.post(this.apiUrl + '/user/create', this.user)
                this.rpgGui.display('rpg-notification', {
                    message: 'Your account has been created. Log in now to play the game',
                    time: 5000,
                    position: 'top',
                    type: 'success'
                })
                this.$emit('back')
            }
            catch (err) {
                if (typeof err == 'string') {
                    this.notificationError(err)
                }
            }
        },
        notificationError(msg) {
            this.rpgGui.display('rpg-notification', {
                message: msg,
                time: 5000,
                position: 'top',
                type: 'error'
            })
        },
        async checkExist() {
            const { data } = await axios.post(this.apiUrl + '/user/exists', {
                nickname: this.user.nickname
            })
            this.nicknameExists = data.exists
            if (this.nicknameExists) {
                this.notificationError(NICKNAME_EXISTS_MSG)
            }
        }
    }
}
</script>

<style scoped lang="scss">
input {
    background: url('@/modules/config/assets/input.png');
    background-size: 100% 100%;
    height: 40px;
    line-height: 30px;
    margin-bottom: 15px;
    padding-left: 10px;
    width: calc(100% - 12px);

    color: white;
    border: none;
}

.login-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    .login-box {
        margin-bottom: 100px;;
        .login-title {
            color: white;
            text-align: center;
            font-size: 30px;
            margin-bottom: 20px;
        }

        background-color: rgba(0, 0, 0, .5);
        width: 400px;
        padding: 2rem 1rem;
        border-radius: 3px;
    }
}

form, p {
    text-align: center;
}
</style>
