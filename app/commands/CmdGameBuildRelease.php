<?php 

class CmdGameBuildRelease implements Asatru\Commands\Command  {
    public function handle($args)
    {
        $bundle = $args?->get(0)?->getValue(1) ?? 'html5';

        GameBuild::make($bundle, false);
    }
}