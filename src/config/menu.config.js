export default [
	{
		key:'userManage',
		icon:'user',
		menu_text:'用户管理',
		menuItem:[{
			key:'1',
			name:'list',
			item_text:'用户列表',
			path:'/userManage/list'
		}]
	},
	{
		key:'article',
		icon:'profile',
		menu_text:'文章',
		menuItem:[{
			key:'2',
			name:'list',
			item_text:'文章列表',
			path:'/article/list'
		},{
			key:'3',
			name:'write',
			item_text:'文章创作',
			path:'/article/write'
		}]
	},{
		key:'leave',
		icon:'message',
		menu_text:'留言',
		menuItem:[{
			key:'4',
			name:'list',
			item_text:'留言列表',
			path:'/leave/list'
		}]
	},{
		key:'label',
		icon:'tags',
		menu_text:'标签',
		menuItem:[{
			key:'5',
			name:'list',
			item_text:'标签列表',
			path:'/label/list'
		}]
	},{
		key:'classify',
		icon:'book',
		menu_text:'分类',
		menuItem:[{
			key:'6',
			name:'list',
			item_text:'分类列表',
			path:'/classify/list'
		}]
	},{
		key:'project',
		icon:'folder',
		menu_text:'项目',
		menuItem:[{
			key:'7',
			name:'list',
			item_text:'项目列表',
			path:'/project/list'
		}]
	},{
		key:'imageManage',
		icon:'picture',
		menu_text:'图片',
		menuItem:[{
			key:'8',
			name:'list',
			item_text:'图片管理',
			path:'/imageManage/list'
		}]
	},
	{
		key:'me',
		icon:'user',
		menu_text:'个人中心',
		menuItem:[{
			key:'9',
			name:'list',
			key:'setting',
			item_text:'个人设置',
			path:'/user/setting'
		}]
	}
]