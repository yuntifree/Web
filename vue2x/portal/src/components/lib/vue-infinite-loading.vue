<template>
  <div class="infinite-loading-container">
    <div v-show="isLoading">
      <slot name="spinner">
        <i :class="spinnerType"></i>
      </slot>
    </div>
    <!--div class="infinite-status-prompt" v-show="!isLoading && isComplete && isFirstLoad">
      <slot name="no-results">No results :(</slot>
    </div>
    <div class="infinite-status-prompt" v-show="!isLoading && isComplete && !isFirstLoad">
      <slot name="no-more">No more data :)</slot>
    </div-->
  </div>
</template>
<script>
  const spinnerMapping = {
    bubbles: 'loading-bubbles',
    circles: 'loading-circles',
    default: 'loading-default',
    spiral: 'loading-spiral',
    waveDots: 'loading-wave-dots',
  };
  /**
   * get the first scroll parent of an element
   * @param  {DOM} elm    the element which find scorll parent
   * @return {DOM}        the first scroll parent
   */
  function getScrollParent(elm) {
    if (elm.tagName === 'BODY') {
      return window;
    } else if (['scroll', 'auto'].indexOf(getComputedStyle(elm).overflowY) > -1) {
      return elm;
    }
    return getScrollParent(elm.parentNode);
  }
  /**
   * get current distance from footer
   * @param  {DOM} elm    scroll element
   * @return {Number}     distance
   */
  function getCurrentDistance(elm) {
    const styles = getComputedStyle(elm === window ? document.body : elm);
    const innerHeight = elm === window
                      ? window.innerHeight
                      : parseInt(styles.height, 10);
    const scrollHeight = elm === window
                       ? document.body.scrollHeight
                       : elm.scrollHeight;
    const scrollTop = isNaN(elm.scrollTop) ? elm.pageYOffset : elm.scrollTop;
    const paddingTop = parseInt(styles.paddingTop, 10);
    const paddingBottom = parseInt(styles.paddingBottom, 10);
    return scrollHeight - innerHeight - scrollTop - paddingTop - paddingBottom;
  }
  export default {
    data() {
      return {
        scrollParent: null,
        scrollHandler: null,
        isLoading: false,
        isComplete: false,
        isFirstLoad: true, //save the current loading whether it is the first loading
      };
    },
    computed: {
      spinnerType() {
        return spinnerMapping[this.spinner] || spinnerMapping.default;
      },
      loadingstate() {
        return this.state;
      }
    },
    watch: {
      loadingstate(val) {
        return val;
      }
    },
    props: {
      distance: {
        type: Number,
        default: 100,
      },
      onInfinite: {
        type: Function,
        required: true,
      },
      spinner: String,
      state: {
        type: String,
        required: true,
      },
    },
    mounted() {
      this.$nextTick(()=> {
        this.scrollParent = getScrollParent(this.$el);
        this.scrollHandler = function scrollHandlerOriginal() {
          if (!this.isLoading) {
            this.attemptLoad();
          }
        }.bind(this);
        setTimeout(this.scrollHandler, 1);
        this.scrollParent.addEventListener('scroll', this.scrollHandler);
        console.log(this.loadingstate);
        switch (this.loadingstate) {
          case 'loaded': 
             this.isFirstLoad = false;
             if (this.isLoading) {
               this.attemptLoad();
             } 
             break;
          case 'complete': 
            this.isLoading = false;
            this.isComplete = true;
            this.scrollParent.removeEventListener('scroll', this.scrollHandler); 
            break;
          case 'reset': 
            this.isLoading = false;
            this.isComplete = false;
            this.isFirstLoad = true;
            this.scrollParent.addEventListener('scroll', this.scrollHandler);
            setTimeout(this.scrollHandler, 1);
            break;
        }
      }) 
    },
    methods: {
      attemptLoad() {
        const currentDistance = getCurrentDistance(this.scrollParent);
        console.log(this.isComplete + ',' + currentDistance + ',' +this.distance);
        if (!this.isComplete && currentDistance <= this.distance) {
          this.isLoading = true;
          this.onInfinite.call();
        } else {
          this.isLoading = false;
        }
      },
    },
    destroyed() {
      if (!this.isComplete) {
        this.scrollParent.removeEventListener('scroll', this.scrollHandler);
      }
    },
  };
</script>
<style lang="less" scoped>
.loading-bubbles{
  @size: 1px;
  @radius: 12px;
  @shallow: .4px;
  @c-base: #666;
  position: relative;
  &:before{
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -@size/2;
    margin-left: -@size/2;
    width: @size;
    height: @size;
    border-radius: 50%;
    animation: linear loading-bubbles .85s infinite;
  }
  @keyframes loading-bubbles{
    0%{
      box-shadow: 0 -@radius 0 (@shallow * 1) @c-base,
                  @radius * 0.71 -@radius * 0.71 0 (@shallow * 2) @c-base,
                  @radius 0 0 (@shallow * 3) @c-base,
                  @radius * 0.71 @radius * 0.71 0 (@shallow * 4) @c-base,
                  0 @radius 0 (@shallow * 5) @c-base,
                  -@radius * 0.71 @radius * 0.71 0 (@shallow * 6) @c-base,
                  -@radius 0 0 (@shallow * 7) @c-base,
                  -@radius * 0.71 -@radius * 0.71 0 (@shallow * 8) @c-base;
    }
    12.5%{
      box-shadow: 0 -@radius 0 (@shallow * 8) @c-base,
                  @radius * 0.71 -@radius * 0.71 0 (@shallow * 1) @c-base,
                  @radius 0 0 (@shallow * 2) @c-base,
                  @radius * 0.71 @radius * 0.71 0 (@shallow * 3) @c-base,
                  0 @radius 0 (@shallow * 4) @c-base,
                  -@radius * 0.71 @radius * 0.71 0 (@shallow * 5) @c-base,
                  -@radius 0 0 (@shallow * 6) @c-base,
                  -@radius * 0.71 -@radius * 0.71 0 (@shallow * 7) @c-base;
    }
    25%{
      box-shadow: 0 -@radius 0 (@shallow * 7) @c-base,
                  @radius * 0.71 -@radius * 0.71 0 (@shallow * 8) @c-base,
                  @radius 0 0 (@shallow * 1) @c-base,
                  @radius * 0.71 @radius * 0.71 0 (@shallow * 2) @c-base,
                  0 @radius 0 (@shallow * 3) @c-base,
                  -@radius * 0.71 @radius * 0.71 0 (@shallow * 4) @c-base,
                  -@radius 0 0 (@shallow * 5) @c-base,
                  -@radius * 0.71 -@radius * 0.71 0 (@shallow * 6) @c-base;
    }
    37.5%{
      box-shadow: 0 -@radius 0 (@shallow * 6) @c-base,
                  @radius * 0.71 -@radius * 0.71 0 (@shallow * 7) @c-base,
                  @radius 0 0 (@shallow * 8) @c-base,
                  @radius * 0.71 @radius * 0.71 0 (@shallow * 1) @c-base,
                  0 @radius 0 (@shallow * 2) @c-base,
                  -@radius * 0.71 @radius * 0.71 0 (@shallow * 3) @c-base,
                  -@radius 0 0 (@shallow * 4) @c-base,
                  -@radius * 0.71 -@radius * 0.71 0 (@shallow * 5) @c-base;
    }
    50%{
      box-shadow: 0 -@radius 0 (@shallow * 5) @c-base,
                  @radius * 0.71 -@radius * 0.71 0 (@shallow * 6) @c-base,
                  @radius 0 0 (@shallow * 7) @c-base,
                  @radius * 0.71 @radius * 0.71 0 (@shallow * 8) @c-base,
                  0 @radius 0 (@shallow * 1) @c-base,
                  -@radius * 0.71 @radius * 0.71 0 (@shallow * 2) @c-base,
                  -@radius 0 0 (@shallow * 3) @c-base,
                  -@radius * 0.71 -@radius * 0.71 0 (@shallow * 4) @c-base;
    }
    62.5%{
      box-shadow: 0 -@radius 0 (@shallow * 4) @c-base,
                  @radius * 0.71 -@radius * 0.71 0 (@shallow * 5) @c-base,
                  @radius 0 0 (@shallow * 6) @c-base,
                  @radius * 0.71 @radius * 0.71 0 (@shallow * 7) @c-base,
                  0 @radius 0 (@shallow * 8) @c-base,
                  -@radius * 0.71 @radius * 0.71 0 (@shallow * 1) @c-base,
                  -@radius 0 0 (@shallow * 2) @c-base,
                  -@radius * 0.71 -@radius * 0.71 0 (@shallow * 3) @c-base;
    }
    75%{
      box-shadow: 0 -@radius 0 (@shallow * 3) @c-base,
                  @radius * 0.71 -@radius * 0.71 0 (@shallow * 4) @c-base,
                  @radius 0 0 (@shallow * 5) @c-base,
                  @radius * 0.71 @radius * 0.71 0 (@shallow * 6) @c-base,
                  0 @radius 0 (@shallow * 7) @c-base,
                  -@radius * 0.71 @radius * 0.71 0 (@shallow * 8) @c-base,
                  -@radius 0 0 (@shallow * 1) @c-base,
                  -@radius * 0.71 -@radius * 0.71 0 (@shallow * 2) @c-base;
    }
    87.5%{
      box-shadow: 0 -@radius 0 (@shallow * 2) @c-base,
                  @radius * 0.71 -@radius * 0.71 0 (@shallow * 3) @c-base,
                  @radius 0 0 (@shallow * 4) @c-base,
                  @radius * 0.71 @radius * 0.71 0 (@shallow * 5) @c-base,
                  0 @radius 0 (@shallow * 6) @c-base,
                  -@radius * 0.71 @radius * 0.71 0 (@shallow * 7) @c-base,
                  -@radius 0 0 (@shallow * 8) @c-base,
                  -@radius * 0.71 -@radius * 0.71 0 (@shallow * 1) @c-base;
    }
    100%{
      box-shadow: 0 -@radius 0 (@shallow * 1) @c-base,
                  @radius * 0.71 -@radius * 0.71 0 (@shallow * 2) @c-base,
                  @radius 0 0 (@shallow * 3) @c-base,
                  @radius * 0.71 @radius * 0.71 0 (@shallow * 4) @c-base,
                  0 @radius 0 (@shallow * 5) @c-base,
                  -@radius * 0.71 @radius * 0.71 0 (@shallow * 6) @c-base,
                  -@radius 0 0 (@shallow * 7) @c-base,
                  -@radius * 0.71 -@radius * 0.71 0 (@shallow * 8) @c-base;
    }
  }
}
.loading-circles{
  @size: 5px;
  @radius: 12px;
  @shallow: 8%;
  @c-base: #505050;
  position: relative;
  &:before{
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -@size/2;
    margin-left: -@size/2;
    width: @size;
    height: @size;
    border-radius: 50%;
    animation: linear loading-circles .75s infinite;
  }
  @keyframes loading-circles{
    0%{
      box-shadow: 0 -@radius 0 @c-base,
                  @radius * 0.71 -@radius * 0.71 0 lighten(@c-base, @shallow),
                  @radius 0 0 lighten(@c-base, @shallow * 2),
                  @radius * 0.71 @radius * 0.71 0 lighten(@c-base, @shallow * 3),
                  0 @radius 0 lighten(@c-base, @shallow * 4),
                  -@radius * 0.71 @radius * 0.71 0 lighten(@c-base, @shallow * 5),
                  -@radius 0 0 lighten(@c-base, @shallow * 6),
                  -@radius * 0.71 -@radius * 0.71 0 lighten(@c-base, @shallow * 7);
    }
    12.5%{
      box-shadow: 0 -@radius 0 lighten(@c-base, @shallow * 7),
                  @radius * 0.71 -@radius * 0.71 0 @c-base,
                  @radius 0 0 lighten(@c-base, @shallow * 1),
                  @radius * 0.71 @radius * 0.71 0 lighten(@c-base, @shallow * 2),
                  0 @radius 0 lighten(@c-base, @shallow * 3),
                  -@radius * 0.71 @radius * 0.71 0 lighten(@c-base, @shallow * 4),
                  -@radius 0 0 lighten(@c-base, @shallow * 5),
                  -@radius * 0.71 -@radius * 0.71 0 lighten(@c-base, @shallow * 6);
    }
    25%{
      box-shadow: 0 -@radius 0 lighten(@c-base, @shallow * 6),
                  @radius * 0.71 -@radius * 0.71 0 lighten(@c-base, @shallow * 7),
                  @radius 0 0 @c-base,
                  @radius * 0.71 @radius * 0.71 0 lighten(@c-base, @shallow * 1),
                  0 @radius 0 lighten(@c-base, @shallow * 2),
                  -@radius * 0.71 @radius * 0.71 0 lighten(@c-base, @shallow * 3),
                  -@radius 0 0 lighten(@c-base, @shallow * 4),
                  -@radius * 0.71 -@radius * 0.71 0 lighten(@c-base, @shallow * 5);
    }
    37.5%{
      box-shadow: 0 -@radius 0 lighten(@c-base, @shallow * 5),
                  @radius * 0.71 -@radius * 0.71 0 lighten(@c-base, @shallow * 6),
                  @radius 0 0 lighten(@c-base, @shallow * 7),
                  @radius * 0.71 @radius * 0.71 0 @c-base,
                  0 @radius 0 lighten(@c-base, @shallow * 1),
                  -@radius * 0.71 @radius * 0.71 0 lighten(@c-base, @shallow * 2),
                  -@radius 0 0 lighten(@c-base, @shallow * 3),
                  -@radius * 0.71 -@radius * 0.71 0 lighten(@c-base, @shallow * 4);
    }
    50%{
      box-shadow: 0 -@radius 0 lighten(@c-base, @shallow * 4),
                  @radius * 0.71 -@radius * 0.71 0 lighten(@c-base, @shallow * 5),
                  @radius 0 0 lighten(@c-base, @shallow * 6),
                  @radius * 0.71 @radius * 0.71 0 lighten(@c-base, @shallow * 7),
                  0 @radius 0 @c-base,
                  -@radius * 0.71 @radius * 0.71 0 lighten(@c-base, @shallow * 1),
                  -@radius 0 0 lighten(@c-base, @shallow * 2),
                  -@radius * 0.71 -@radius * 0.71 0 lighten(@c-base, @shallow * 3);
    }
    62.5%{
      box-shadow: 0 -@radius 0 lighten(@c-base, @shallow * 3),
                  @radius * 0.71 -@radius * 0.71 0 lighten(@c-base, @shallow * 4),
                  @radius 0 0 lighten(@c-base, @shallow * 5),
                  @radius * 0.71 @radius * 0.71 0 lighten(@c-base, @shallow * 6),
                  0 @radius 0 lighten(@c-base, @shallow * 7),
                  -@radius * 0.71 @radius * 0.71 0 @c-base,
                  -@radius 0 0 lighten(@c-base, @shallow * 1),
                  -@radius * 0.71 -@radius * 0.71 0 lighten(@c-base, @shallow * 2);
    }
    75%{
      box-shadow: 0 -@radius 0 lighten(@c-base, @shallow * 2),
                  @radius * 0.71 -@radius * 0.71 0 lighten(@c-base, @shallow * 3),
                  @radius 0 0 lighten(@c-base, @shallow * 4),
                  @radius * 0.71 @radius * 0.71 0 lighten(@c-base, @shallow * 5),
                  0 @radius 0 lighten(@c-base, @shallow * 6),
                  -@radius * 0.71 @radius * 0.71 0 lighten(@c-base, @shallow * 7),
                  -@radius 0 0 @c-base,
                  -@radius * 0.71 -@radius * 0.71 0 lighten(@c-base, @shallow * 1);
    }
    87.5%{
      box-shadow: 0 -@radius 0 lighten(@c-base, @shallow * 1),
                  @radius * 0.71 -@radius * 0.71 0 lighten(@c-base, @shallow * 2),
                  @radius 0 0 lighten(@c-base, @shallow * 3),
                  @radius * 0.71 @radius * 0.71 0 lighten(@c-base, @shallow * 4),
                  0 @radius 0 lighten(@c-base, @shallow * 5),
                  -@radius * 0.71 @radius * 0.71 0 lighten(@c-base, @shallow * 6),
                  -@radius 0 0 lighten(@c-base, @shallow * 7),
                  -@radius * 0.71 -@radius * 0.71 0 @c-base;
    }
    100%{
      box-shadow: 0 -@radius 0 @c-base,
                  @radius * 0.71 -@radius * 0.71 0 lighten(@c-base, @shallow),
                  @radius 0 0 lighten(@c-base, @shallow * 2),
                  @radius * 0.71 @radius * 0.71 0 lighten(@c-base, @shallow * 3),
                  0 @radius 0 lighten(@c-base, @shallow * 4),
                  -@radius * 0.71 @radius * 0.71 0 lighten(@c-base, @shallow * 5),
                  -@radius 0 0 lighten(@c-base, @shallow * 6),
                  -@radius * 0.71 -@radius * 0.71 0 lighten(@c-base, @shallow * 7);
    }
  }
}
.loading-wave-dots{
  @size: 8px;
  @wave: -6px;
  @near-wave: -4px;
  @after-wave: 2px;
  @c-wave: #999;
  @c-near-wave: #bbb;
  position: relative;
  &:before{
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -@size/2;
    margin-top: -@size/2;
    width: @size;
    height: @size;
    background-color: @c-near-wave;
    border-radius: 50%;
    animation: linear loading-wave-dots 2.8s infinite;
  }
  @keyframes loading-wave-dots{
    0%{
      box-shadow: -@size * 4 0 0 @c-near-wave,
                  -@size * 2 0 0 @c-near-wave,
                  @size * 2 0 0 @c-near-wave,
                  @size * 4 0 0 @c-near-wave;
    }
    5%{
      box-shadow: -@size * 4 @near-wave 0 @c-near-wave,
                  -@size * 2 0 0 @c-near-wave,
                  @size * 2 0 0 @c-near-wave,
                  @size * 4 0 0 @c-near-wave;
      transform: translateY(0);
    }
    10%{
      box-shadow: -@size * 4 @wave 0 @c-wave,
                  -@size * 2 @near-wave 0 @c-near-wave,
                  @size * 2 0 0 @c-near-wave,
                  @size * 4 0 0 @c-near-wave;
      transform: translateY(0);
    }
    15%{
      box-shadow: -@size * 4 @after-wave 0 @c-near-wave,
                  -@size * 2 @wave - @near-wave 0 @c-wave,
                  @size * 2 -@near-wave 0 @c-near-wave,
                  @size * 4 -@near-wave 0 @c-near-wave;
      transform: translateY(@near-wave);
      background-color: @c-near-wave;
    }
    20%{
      box-shadow: -@size * 4 -@wave 0 @c-near-wave,
                  -@size * 2 @near-wave - @wave + @after-wave 0 @c-near-wave,
                  @size * 2 @near-wave - @wave 0 @c-near-wave,
                  @size * 4 -@wave 0 @c-near-wave;
      transform: translateY(@wave);
      background-color: @c-wave;
    }
    25%{
      @offset: @near-wave + @after-wave;
      box-shadow: -@size * 4 -@offset 0 @c-near-wave,
                  -@size * 2 -@offset 0 @c-near-wave,
                  @size * 2 @wave - @offset 0 @c-wave,
                  @size * 4 @near-wave - @offset 0 @c-near-wave;
      transform: translateY(@offset);
      background-color: @c-near-wave;
    }
    30%{
      box-shadow: -@size * 4 0 0 @c-near-wave,
                  -@size * 2 0 0 @c-near-wave,
                  @size * 2 @near-wave + @after-wave 0 @c-near-wave,
                  @size * 4 @wave 0 @c-wave;
      transform: translateY(0);
    }
    35%{
      box-shadow: -@size * 4 0 0 @c-near-wave,
                  -@size * 2 0 0 @c-near-wave,
                  @size * 2 0 0 @c-near-wave,
                  @size * 4 @near-wave + @after-wave 0 @c-near-wave;
    }
    40%{
      box-shadow: -@size * 4 0 0 @c-near-wave,
                  -@size * 2 0 0 @c-near-wave,
                  @size * 2 0 0 @c-near-wave,
                  @size * 4 0 0 @c-near-wave;
    }
    100%{
      box-shadow: -@size * 4 0 0 @c-near-wave,
                  -@size * 2 0 0 @c-near-wave,
                  @size * 2 0 0 @c-near-wave,
                  @size * 4 0 0 @c-near-wave;
    }
  }
}

.loading-default{
  position: relative;
  border: 1px solid #999;
  animation: ease loading-rotating 1.5s infinite;
  &:before{
    @size: 6px;
    content: '';
    position: absolute;
    display: block;
    top: 0;
    left: 50%;
    margin-top: -@size/2;
    margin-left: -@size/2;
    width: @size;
    height: @size;
    background-color: #999;
    border-radius: 50%;
  }
}

.loading-spiral{
  border: 2px solid #777;
  border-right-color: transparent;
  animation: linear loading-rotating .85s infinite;
}

@keyframes loading-rotating{
  0%{
    transform: rotate(0);
  }
  100%{
    transform: rotate(360deg);
  }
}
.infinite-loading-container{
  clear: both;
  text-align: center;
  *[class^=loading-]{
    @size: 28px;
    display: inline-block;
    margin: 15px 0;
    width: @size;
    height: @size;
    font-size: @size;
    line-height: @size;
    border-radius: 50%;
  }
}
.infinite-status-prompt{
  color: #666;
  font-size: 14px;
  text-align: center;
  padding: 10px 0;
}
</style>