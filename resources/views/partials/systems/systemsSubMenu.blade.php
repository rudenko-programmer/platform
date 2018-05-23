<li class="list-group-item padder-v">
    <a href="{{$route}}" class="d-block padder">
        <div>
            @isset($badge)
                <b class="badge {{$badge['class']}} pull-right">{{$badge['data']()}}</b>
            @endisset
            <span class="text-muted"><i class="{{$icon}} pull-right m-t-sm text-lg"></i></span>
            <div class="clear">
                <div>{{trans($label)}}</div>
                <small class="text-muted">{{trans($groupname ?? '')}}</small>
            </div>
        </div>
    </a>
</li>