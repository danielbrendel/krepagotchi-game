<?php 

class CmdGameBuildDebug implements Asatru\Commands\Command  {
    public function handle($args)
    {
        $bundle = $args?->get(0)?->getValue(1);

        GameBuild::make($bundle, true);
    }
}