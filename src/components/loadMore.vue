<script type="text/ecmascript-6">
import {Loadmore} from 'mint-ui';
  export default {
    name:'mt-loadmore',
    extends:Loadmore,
    props:{
      autoFill:{
        type:Boolean,
        default:false
      }
    },
    methods: {
      handleTouchEnd() {
        if (this.direction === 'down' && this.getScrollTop(this.scrollEventTarget) === 0 && this.translate > 0) {
          event.preventDefault();
          event.stopPropagation();
          this.topDropped = true;
          if (this.topStatus === 'drop') {
            this.translate = '50';
            this.topStatus = 'loading';
            this.topMethod();
          } else {
            this.translate = '0';
            this.topStatus = 'pull';
          }
        }
        if (this.direction === 'up' && this.bottomReached && this.translate < 0) {
          event.preventDefault();
          event.stopPropagation();
          this.bottomDropped = true;
          this.bottomReached = false;
          if (this.bottomStatus === 'drop') {
            this.translate = '-50';
            this.bottomStatus = 'loading';
            this.bottomMethod();
          } else {
            this.translate = '0';
            this.bottomStatus = 'pull';
          }
        }
        this.$emit('translate-change', this.translate);
        this.direction = '';
      }
    }
  }
</script>
