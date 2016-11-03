<template>
  <div role="dialog"
    v-bind:class="{
    'modal':true,
    'fade':effect === 'fade',
    'zoom':effect === 'zoom'
    }"
    >
    <div v-bind:class="{'modal-dialog':true,'modal-lg':large,'modal-sm':!auto && !big && !notice}" role="document"
      v-bind:style="{width: optionalWidth}">
      <div class="modal-content" :class="{'modal-big':big,'modal-notice':notice,'modal-paddb':paddb}">
        <slot name="modal-header">
          <div class="modal-header">
            <button type="button" class="close" @click="close"><span>&times;</span></button>
            <h4 class="modal-title" >{{title}}</h4>
          </div>
        </slot>
        <slot name="modal-body">
          <div class="modal-body"></div>
        </slot>
        <slot name="modal-footer" v-if="btnshow">
          <div class="modal-footer">
            <button type="button" class="btn btn-default btn-img" @click="close">取消</button>
            <button type="button" class="btn btn-primary" @click="callback">确定</button>
          </div>
        </slot>
        <slot name="modal-footer" v-if="btnmsg">
          <div class="modal-footer">
            <button type="button" class="btn btn-default btn-img" @click="close">取消</button>
            <button type="button" class="btn btn-primary" @click="callback">{{btnmsg}}</button>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import getScrollBarWidth from './utils/getScrollBarWidth.js'
import EventListener from './utils/EventListener.js'

  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      show: {
        require: true,
        type: Boolean,
        twoWay: true
      },
      width: {
        default: null
      },
      callback: {
        type: Function,
        default() {}
      },
      effect: {
        type: String,
        default: null
      },
      backdrop: {
        type: Boolean,
        default: true
      },
      large: {
        type: Boolean,
        default: false
      },
      big: {
        type: Boolean,
        default: false
      },
      notice: {
        type: Boolean,
        default: false,
      },
      auto: {
        type: Boolean,
        default: false
      },
      btnshow: {
        type: Boolean,
        default: true
      },
      btnmsg: {
        type: String,
        default: ''
      }
    },
    watch: {
      show(val) {
        const el = this.$el
        const body = document.body
        const scrollBarWidth =  getScrollBarWidth()
        if (val) {
          el.querySelector('.modal-content').focus()
          el.style.display = 'block'
          this.$nextTick(()=> el.classList.add('in'));
          body.classList.add('modal-open')
          // if (scrollBarWidth !== 0) {
          //   body.style.paddingRight = scrollBarWidth + 'px'
          // }
          if (this.backdrop) {
            this._blurModalContentEvent = EventListener.listen(this.$el, 'click', (e)=> {
              if (e.target === el) this.show = false
            })
          }
        } else {
          if (this._blurModalContentEvent) this._blurModalContentEvent.remove()
          el.classList.remove('in')
          this.$nextTick(()=> {
            el.style.display = 'none'
            body.classList.remove('modal-open')
            //body.style.paddingRight = '0'
          })
          // 通知子类
          this.$broadcast('modal-close');
        }
      }
    },
    computed: {
      optionalWidth: function() {
        if( this.width === null ) {
          return null;
        } else if( Number.isInteger(this.width) ) {
          return this.width + "px";
        }
        return this.width;
      },
    },
    methods: {
      close() {
        this.show = false
      }
    }
  }
</script>
<style>
.modal {
  transition: all 0.2s ease;
  height:100%;
  overflow: hidden !important;
  z-index: 5;
}
.modal.in {
  background-color: rgba(0,0,0,0.5);
}
.modal.zoom .modal-dialog {
    -webkit-transform: scale(0.1);
    -moz-transform: scale(0.1);
    -ms-transform: scale(0.1);
    transform: scale(0.1);
    top: 300px;
    opacity: 0;
    -webkit-transition: all 0.2s;
    -moz-transition: all 0.2s;
    transition: all 0.2s;
}
.modal.zoom.in .modal-dialog {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
    -webkit-transform: translate3d(0, -300px, 0);
    transform: translate3d(0, -300px, 0);
    opacity: 1;
}

.modal-dialog {
  margin: 0 auto;
  height: 100%;
}

.modal-content {
  max-height: 65%;
  padding:56px 0 63px;
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.modal-big {
  height: 65%;
}

.modal-notice {
  height: 390px;
}

.modal-body {
  height: 100%;
  overflow-y: auto;
}
.modal-header {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
}

.modal-footer {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
}
.modal-paddb {
  padding-bottom: 0;
}
</style>
