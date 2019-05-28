<template>
  <div id="scroeList">
    <div class="title_fixed ac">查 看 成 绩</div>
  	<div id="tables">
  		<div id="autoCode">

  			<div class="main" v-show="!dialogVisible">

  	            <div class="formData clearfix">
  	                <div class="items ">
  	                    <el-input v-model="query.userName" class="fomatInput" type="text" placeholder="姓名" />
  	                </div>

  	                <div class="items ">
  	                    <el-input v-model="query.userPhone" class="fomatInput" type="text" placeholder="手机号" />
  	                </div>

                    <div class="items ">
  	                </div>
                    <div class="items ">
                    	<el-button type="primary" @click="loadData">查询</el-button>
  	                </div>

  	                <!-- <div class="items">
  	                	<el-button type="primary" @click="setQuestion">题目设置</el-button>
  	                </div> -->
  	            </div>
  	            <div class="tables">
              		<el-table   :data="tableData"  style="width: 100%" >
  			            <el-table-column align="center" prop="userName" width='200' label="姓名" ></el-table-column>
                    <el-table-column align="center" prop="userAge" width='70' label="年龄" ></el-table-column>
  			            <el-table-column align="center" prop="userPhone" width='200' label="手机号" ></el-table-column>
                    <el-table-column align="center" prop="userAddress" width='200' label="所在地" ></el-table-column>
                    <el-table-column align="center" prop="userFlag" width='90' :formatter="flagFormat" label="是否答题" ></el-table-column>
  			            <el-table-column align="center" prop="userTime" width='100' label="答题时间(s)" ></el-table-column>
                    <el-table-column align="center" prop="userDate" :formatter="formatDate" label="答题日期" ></el-table-column>
  			            <el-table-column align="center" class-name="operations" label="操作" width="80">
  				            <template slot-scope="scope" v-if="scope.row.userFlag == 1">
  				             	<div class="op_items">
      			    					<el-button size="mini" @click="show(scope.row.id,scope.row.userName)">查看</el-button>
      			    				</div>
  				            </template>
  			            </el-table-column>
  	            	</el-table>
  	            </div>
  	            <div class="pages_so">
  	            	<el-pagination @size-change="pageSizeChange" @current-change="pageChange" :current-page.sync="page.pageNum"
      				      :page-sizes="[10, 20, 30, 40]"
      				      :page-size="page.pageSize"
      				      layout="sizes,prev, pager, next,jumper" :total="page.total">
      				    </el-pagination>
  	            </div>

          	</div>

            <div class="main" v-show="dialogVisible" v-loading="loading">
              <div class="bodys">
                <div style="width:100%;height:40px;line-height:40px;text-align:center;">
                  {{name}}的成绩单
                </div>
                <div id="randar"></div>
      					<div class="table_right">
                  <div style="text-align:right;padding-right:20px;">
                    分数: {{score}} / {{total}}
                  </div>
      						<el-table   :data="tableData_info" height="400" style="width: 100%" >
    			            <el-table-column align="center" prop="sort" width="60" label="题号" ></el-table-column>
    			            <el-table-column align="center" prop="questionBankVO.answer" width="120" label="标准答案" ></el-table-column>
    			            <el-table-column align="center" prop="userAnswer" label="选手答案" ></el-table-column>
                      <el-table-column align="center" prop="time" width="120" label="答题时间" ></el-table-column>
    			            <el-table-column align="center" prop="score" width="60" label="得分" ></el-table-column>
    			            <el-table-column align="center" prop="questionBankVO.ablity" width="200" label="能力属性" ></el-table-column>
    	            	</el-table>
      					</div>
              </div>
              <div class="btn"  @click="dialogVisible = false">
                返  回
              </div>
    				</div>




          	<!-- <el-dialog title="查看成绩" :visible.sync="dialogVisible" width="98%" >
      				<div class="answer-body" v-loading="loading">
      					<div id="randar"></div>
      					<div class="table_right">
      						<el-table   :data="tableData_info"  style="width: 100%" >
    			            <el-table-column align="center" prop="sort" label="题号" ></el-table-column>
    			            <el-table-column align="center" prop="answer" label="标准答案" ></el-table-column>
    			            <el-table-column align="center" prop="userAnswer" label="这货的答案" ></el-table-column>
    			            <el-table-column align="center" prop="time" label="答题时间" ></el-table-column>
    			            <el-table-column align="center" prop="ablity" label="能力属性" ></el-table-column>
    	            	</el-table>
      					</div>
      				</div>

    				<span slot="footer" class="dialog-footer">
    				  <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    				</span>
    			</el-dialog> -->

  		</div>
  	</div>
  </div>
</template>

<script>
var echarts = require('echarts');
export default {
  data(){
    return{
      query:{
  		  userName:'',
  		  userPhone:'',
  	  },
  	  tableData:[],
  	  page:{
      	pageNum:1,
      	pageSize:10,
      	total:1
      },
      dialogVisible:false,
      loading:true,
      tableData_info:[],
      myChart:{},

      score:0,
      total:0,
      name:''
    }
  },
  mounted:function(){
	this.loadData();
  },
  methods:{
	  loadData(){
		  var data = this.query;
	      data['pageNum'] = this.page.pageNum;
  		  data['pageSize'] = this.page.pageSize;
  		  this.$postHttp("userscore/queryUserScores",data,res=>{
  			  this.tableData = res.result.list;
  			  this.page.pageNum = res.result.pageNum;
  			  this.page.total = res.result.total;
  		  })
	  },
	  formatDate(row,value,cell){
			if (cell == undefined || cell == '') {
			 return "";
			}
			return this.$timeF(cell).format("LLLL");
	  },
    flagFormat(row,value,cell){
      if(cell == '1'){
        return '是'
      }else{
        return '否'
      }
    },
	  show(id,name){
		  this.loading = true;
		  this.dialogVisible = true;
      this.name = name;
		  this.$postHttp("useranswer/getUserAnswerByUserIdWithData",{userId:id},res=>{
        this.tableData_info = res.result.list;
        this.score = res.result.score;
        this.total = res.result.total;
        if(res.result.listAblity.length != 0){
          setTimeout(data=>{
            this.randars(res);
          },100);
        }else{
          this.myChart.clear();
          this.loading = false;
        }
		  })
	  },
	  randars(res){
		  var docs = document.getElementById('randar');
		  this.myChart = echarts.init(docs);
      var listAblity = res.result.listAblity;
      var ablityValue = res.result.ablityValue;
		  var option = {
  			title: {
  			     x: 'center',
  			    text: '能力值'
  			},
  			tooltip: {
  			    trigger: 'axis'
  			},
  			radar: [
  			    {
  			        indicator: listAblity,
  			        center: ['50%','50%'],
  			        radius: 50
  			    }
  			],
  			series: [
  			    {
  			        type: 'radar',
  			         tooltip: {
  			            trigger: 'item'
  			        },
  			        itemStyle: {normal: {areaStyle: {type: 'default'}}},
  			        data: [
  			               {
    			                value: ablityValue,
    			                name: '能力表'
  			                }
  			            ]
  			        }
  			    ]
		  };
		  this.myChart.setOption(option);
		  this.loading = false;
	  },
	  pageSizeChange(val) {
		  this.page.pageSize = val;
      this.page.pageNum = 1;
		  this.loadData();
	  },
	  pageChange(val) {
		  this.page.pageNum = val;
		  this.loadData();
	  },
    setQuestion(){
      this.$router.push("questionList")
    }
  }
}
</script>

<style>
#tables{
	min-height:300px;
}
body{
	width: 100%;
    background: #fcc;
}

::-webkit-scrollbar{width: 10px;position: absolute;right: 0px;top: 0px;z-index: 9999;}
::-webkit-scrollbar-track{background-color:#E0E0E0;-webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius:5px;}
::-webkit-scrollbar-thumb{background-color:#868686;-webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius:5px;}

#autoCode .main{
    width: 98%;
    background: #fff;
    color: #666;
    min-height: 700px;
    margin: 80px auto;
    border-radius: 5px;
}
#scroeList .bodys{
  display: flex;
  width: 100%;
  padding: 80px 0;
  flex-wrap: wrap;
}

#autoCode .formData{
	width: 90%;
	margin:30px auto;
  display: flex;
}

#autoCode .formData .items{
	width: 21%;
	margin:20px 2% 0px 2%;
}

#randar{
	width:400px;
	height:300px;
  margin:auto;
}
/* .answer-body .table_right{
	width:calc(100% - 320px);
	margin-left:20px;
} */
#scroeList .bodys .table_right{
	width:calc(100% - 400px);
}
#scroeList .btn{
  width:200px;
  line-height: 40px;
  border-radius: 4px;
  background: #409EFF;
  color: #fff;
  cursor: pointer;
  text-align: center;
  margin: 20px auto;
  font-size: 16px;
}
</style>
