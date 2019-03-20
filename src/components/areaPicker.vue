<template>
    <mt-popup v-model="visible" popup-transition="popup-slide" position="bottom">
      <div class="month-picker">
        <div class="picker-toolbar"><span class="mint-datetime-action mint-datetime-cancel" @click="cancel">取消</span> <span class="mint-datetime-action mint-datetime-confirm" @click="onConfirm">确定</span></div>
        <mt-picker ref="picker" :slots="slots" value-key="name" :visibleItemCount="7" @change="onValuesChange"></mt-picker>
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


        provId:'',//省份ID
        cityId:'',//市ID
        areaId:'',//区ID
        oldCityList: [],//初始市
        oldAreaList:[],//初始区
        oldSlotValues:[],//初始选中值
        cityDataReady: false,
        selectParams:'',//选择传参
        defaultValues:[]
      }
    },
    created(){
        
    },
    mounted(){

    },
    computed: {

    },
    methods: {
      open(values=[],params){
        console.log(values)
        this.selectParams = params;//自定义传参
        if (values && values.length && values[0] && values[1] && values[2]) {
          this.defaultValues = values || [];//打开时设置值
          this.setDefaultValue();
        } else {
          this.renderData();
        }
        this.visible = true
      },
      close(){
        this.visible = false;
      },
      cancel(){//取消
        this.close();
        // 取消赋值缓存的数据
        let refPicker = this.$refs.picker;
        refPicker.setSlotValues(1,this.oldCityList);
        refPicker.setSlotValues(2,this.oldAreaList);
        refPicker.setValues(this.oldSlotValues);
      },
      renderData(){
        this.getProv().then((res)=>{
          this.slots[0].values = res;
          this.getCity(res[0].id).then((resCity)=>{
            this.slots[1].values = resCity;
            this.getDist(resCity[0].id).then((resArea)=>{
              this.slots[2].values = resArea;
            })
          })
        })
      },
      setDefaultValue(){
        // 获取省数据
        this.getProv().then(res => {
          this.slots[0].values = res;
          res.forEach((item, index) => {
            if (item.name == this.defaultValues[0] || item.id == this.defaultValues[0]) {
              this.provId = item.id;
              this.slots[0].defaultIndex = index;
              // 获取市数据
              this.getCity(item.id).then((resCity) => {
                this.oldCityList = resCity;
                this.slots[1].values = resCity;
                resCity.forEach((item, index) => {
                  if (item.name == this.defaultValues[1] || item.id == this.defaultValues[1]) {
                    this.cityId = item.id;
                    this.slots[1].defaultIndex = index;
                    // 获取区的数据
                    this.getDist(item.id).then((resArea) => {
                      resArea.forEach((item, index) => {
                        if (item.name == this.defaultValues[2] || item.id == this.defaultValues[2]) {
                          this.areaId = item.id;
                          this.slots[2].defaultIndex = index;
                        }
                      });
                      this.oldAreaList = resArea;
                      this.slots[2].values = resArea;
                      this.cityDataReady = true;
                      let valueArr = this.$refs.picker.getValues();
                      this.oldSlotValues = valueArr.concat();
                    })
                  }
                })
              });

            }
          })
        })
      },
      onValuesChange(picker, values) {
        if(this.cityDataReady){
          console.log(this.provId,values,values[0].id,values[1].id,'ididididididid')
          if(this.provId != values[0].id){
            //请求市
            this.getCity(values[0].id).then((res) => {
              picker.setSlotValues(1,res);
              this.provId = values[0].id;
              this.cityId = values[1].id;
            })
          }
          if(this.cityId !=values[1].id){
            //请求区
            this.getDist(values[1].id).then((res) => {
              picker.setSlotValues(2,res);
              this.provId = values[0].id;
              this.cityId = values[1].id;
            })
          }
        }

      },
      onConfirm(){
        let {selectParams} = this;
        // 选择后的数据
        let refPicker = this.$refs.picker;
        let valueArr = refPicker.getValues();
        this.oldSlotValues = valueArr.concat();
        this.oldCityList = refPicker.getSlotValues(1);
        this.oldAreaList = refPicker.getSlotValues(2);
        let {oldSlotValues} = this;
        let cdata = {
          prov:{id : oldSlotValues[0].id, name: oldSlotValues[0].name },
          city:{id : oldSlotValues[1].id, name: oldSlotValues[1].name },
          dist:{id : oldSlotValues[2].id, name: oldSlotValues[2].name },
        };
        this.$emit('confirm',cdata,selectParams);
        this.close();

      },
      getProv(){
        return new Promise((rev,rej)=>{
          if(this.prov.length){
            rev(this.prov)
          }else{
            postTokenData('/select/selectData/getAreaList',{},(res)=>{
                if(res.code==='0000'){
                  let rjson = res.data || [];
                  let rlist = []
                  rjson.map((item)=>{
                    rlist.push(item.name)
                  })
                  this.prov = rjson;
                  // this.slots[0].values = rlist;
                  rev(res.data)
                }
            })
          }
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
                // this.slots[1].values = rlist;
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
                // this.slots[2].values = rlist;
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
      }
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