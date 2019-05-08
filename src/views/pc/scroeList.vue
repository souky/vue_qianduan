<template>
  <div id="scroeList">
    <div class="title_fixed ac">查 看 成 绩</div>
  	<div id="tables">
  		<div id="autoCode">

  			<div class="main">

  	            <div class="formData clearfix">
  	                <div class="items ">
  	                    <el-input v-model="query.userName" class="fomatInput" type="text" placeholder="姓名" />
  	                </div>

  	                <div class="items ">
  	                    <el-input v-model="query.userPhone" class="fomatInput" type="text" placeholder="手机号" />
  	                </div>

                    <div class="items ">
                    	<el-button type="primary" @click="loadData">查询</el-button>
  	                </div>

  	                <div class="items">
  	                	<el-button type="primary" @click="setQuestion">题目设置</el-button>
  	                </div>
  	            </div>
  	            <div class="tables">
              		<el-table   :data="tableData"  style="width: 100%" >
  			            <el-table-column align="center" prop="userName" label="姓名" ></el-table-column>
  			            <el-table-column align="center" prop="userPhone" label="手机号" ></el-table-column>
                    <el-table-column align="center" prop="userScore" label="分数" ></el-table-column>
  			            <el-table-column align="center" prop="userTime" label="答题时间(s)" ></el-table-column>
  			            <el-table-column align="center" class-name="operations" label="操作" width="90">
  				            <template slot-scope="scope">
  				             	<div class="op_items">
  			    					<el-button size="mini" @click="show(scope.row.id)">查看</el-button>
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

          	<el-dialog title="查看成绩" :visible.sync="dialogVisible" width="80%" >
    				<div class="answer-body" v-loading="loading">
    					<div id="randar"></div>
    					<div class="table_right">
    						<el-table   :data="tableData"  style="width: 100%" >
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
  			</el-dialog>

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
	  formatDate(row,value){

	  },
	  show(id){
		  this.loading = true;
		  this.dialogVisible = true;
		  this.$postHttp("useranswer/getUserAnswerByUserIdWithData",{userId:id},res=>{
				console.log(res);
        setTimeout(data=>{
          this.randars(res);
        },100);
		  })
	  },
	  randars(res){
		  var docs = document.getElementById('randar');
		  var myChart = echarts.init(docs);
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
  			        center: ['50%','40%'],
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
		  myChart.setOption(option);
		  this.loading = false;
	  },
	  pageSizeChange(val) {
		  this.page.pageSize = val;
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

#autoCode .formData{
	width: 90%;
	margin:30px auto;
  display: flex;
}

#autoCode .formData .items{
	width: 21%;
	margin:20px 2% 0px 2%;
}

.answer-body{
	width:95%;
	margin:auto;
	display:flex;
}
.answer-body #randar{
	width:300px;
	height:400px;
}
.answer-body .table_right{
	width:calc(100% - 320px);
	margin-left:20px;
}

</style>
