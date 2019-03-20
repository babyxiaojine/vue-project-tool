<template>
    <mt-popup v-model="visible" popup-transition="popup-slide" position="bottom">
      <div class="month-picker">
        <div class="picker-toolbar"><span class="mint-datetime-action mint-datetime-cancel" @click="close">取消</span> <span class="mint-datetime-action mint-datetime-confirm" @click="onConfirm">确定</span></div>
        <mt-picker ref="picker" :slots="slots" :visibleItemCount="7" @change="onValuesChange"></mt-picker>
      </div>
    </mt-popup>
</template>

<script>
  import {base,postTokenData} from '@/util/common'
  export default {
    name:'areaPicker',
    data(){
      return{
        visible:false, 
        slots: [{
              flex: 1,
              values: [],
              className: 'slot1',
              textAlign: 'center'
            }, {
              flex: 1,
              values: [],
              className: 'slot2',
              textAlign: 'center'
            }, {
              flex: 1,
              values: [],
              className: 'slot2',
              textAlign: 'center'
            }
          ],
        activeData:[],
        prov:[],
        city:[],
        dist:[],
        defaultValues:['','','']
      }
    },
    props:{

    },
    created(){
        
    },
    mounted(){
      this.renderData();
    },
    computed: {

    },
    methods: {
      open(defaultValues){
        this.visible = true
        // if(defaultValues){
        //   this.defaultValues = defaultValues;
        //   this.$nextTick(()=>{
        //     this.setDefaultValue(defaultValues)
        //   })
        // }
      },
      close(){
        this.visible = false
      },
      renderData(){
        this.getProv()
      },
      setDefaultValue(defaultValues){
        let a_prov = this.selectItem(this.prov,defaultValues[0]);
        if(defaultValues[0]){
          this.$refs.picker.setSlotValue(0, defaultValues[0]);
        }
        
        this.$nextTick(()=>{
          console.log(this.city)
        })
      },
      onValuesChange(picker, values) {
        const {activeData} = this;
        if (activeData[0] != values[0]) {
          let aid = '';
          this.prov.forEach((item,index)=>{
            if(item.name == values[0]){
              aid = item.id;
              this.slots[0].defaultIndex= index;
            }
          });
          this.getCity(aid).then(()=>{
            if(this.defaultValues[1]){
              this.$refs.picker.setSlotValue(0, this.defaultValues[1]);
            }
            this.activeData = {...values};
          })
        }
        if (activeData[1] != values[1]) {
          let aid = '';
          this.city.forEach((item,index)=>{
            if(item.name == values[1]){
              aid = item.id;
              this.slots[1].defaultIndex= index;
            }
          });
          this.getDist(aid).then(()=>{
          })
        }
        this.activeData = {...values};

      },
      onConfirm(){
        const {activeData, selectItem, prov, city, dist} = this;
        const cdata = {
          prov:{id : selectItem(prov, activeData[0]).id, name: activeData[0] },
          city:{id : selectItem(city, activeData[1]).id, name: activeData[1] },
          dist:{id : selectItem(dist, activeData[2]).id, name: activeData[2] },
        }
        console.log(cdata)
        this.$emit('confirm',cdata);
        this.close();
      },
      getProv(){
        return new Promise((rev,rej)=>{
          postTokenData('/select/selectData/getAreaList',{},(res)=>{
              if(res.code==='0000'){
                let rjson = res.data || [];
                let rlist = []
                rjson.map((item)=>{
                  rlist.push(item.name)
                })
                this.prov = rjson;
                this.slots[0].values = rlist;
                rev(res.data)
              }
          })
        }).catch((err)=>{
          console.log(err)
        })
      },
      getCity(id){
        return new Promise((rev,rej)=>{
          postTokenData('/select/selectData/getAreaList',{type:1,id},(res)=>{
              if(res.code==='0000'){
                let rjson = res.data || [];
                let rlist = []
                rjson.map((item)=>{
                  rlist.push(item.name)
                })
                this.city = rjson;
                this.slots[1].values = rlist;
                rev(res.data)
              }
          })
        }).catch((err)=>{
          console.log(err)
        })
      },
      getDist(id){
        return new Promise((rev,rej)=>{
          postTokenData('/select/selectData/getAreaList',{type:2,id},(res)=>{
              if(res.code==='0000'){
                let rjson = res.data || [];
                let rlist = []
                rjson.map((item)=>{
                  rlist.push(item.name)
                })
                this.dist = rjson;
                this.slots[2].values = rlist;
                rev(res.data)
              }
          })
        }).catch((err)=>{
          console.log(err)
        })
      },
      selectItem(arr,str){
        let k = '';
        for(let i=0; i<arr.length;i++){
          if(arr[i].name == str){
            k = arr[i];
            break;
          }
        }
        return k;
      },
    }
  }
</script>

<style type="text/css" lang="scss">
    @import '~@/assets/css/base';
    .month-picker{
      .picker-items{width: 100vw;}
      .picker-toolbar{border-bottom: 1px solid #eaeaea;}
    }

</style>